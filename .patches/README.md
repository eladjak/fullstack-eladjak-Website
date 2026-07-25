# Parked patches

Changes deliberately removed from an unrelated commit and held here until they
can be landed on their own terms. **Do not apply one of these as a drive-by.**

---

## `business-name-receipt.patch`

**What it does.** Lets a Business Brain buyer have the receipt issued to their
business rather than to themselves. The checkout route reads two optional body
fields, `businessName` and `taxId`, sets the Sumit customer `Name` to
`businessName || name`, and appends the contact name and ח.פ/ע.מ to
`DocumentDescription`.

**Why it was parked.** It rode along inside `b1bb5fe`, a commit whose subject is
"wow-2026 pass — shared interaction layer on every route". A change to who
appears on a real customer's tax receipt must not be reviewable only as a side
effect of a CSS pass, and must be revertable on its own. The route was restored
to `f40f2c8` ("fix(sumit): use verified beginredirect API (tested live)"), the
last independently verified payment version.

**This patch is only half the feature.** The two matching form inputs in
`src/app/products/business-brain/page.tsx` (`co-business` /
`שם העסק (לקבלה)` and `co-taxid` / `ח.פ / ע.מ (לא חובה)`) plus their
`businessName` / `taxId` state and their entry in the POST body were removed in
the same revert. They had to go together: leaving a field labelled
"שם העסק (לקבלה)" — *business name, for the receipt* — above a route that
ignores it would promise a paying customer something the system would not do,
and would produce a receipt naming the wrong legal entity. Restoring the feature
means restoring both halves.

### Required before this is applied

1. **Input validation, server-side.** Neither field is validated today. Both are
   free text that lands on a tax document.
   - `businessName`: trim, enforce a maximum length, reject control characters
     and newlines (it is interpolated into `DocumentDescription`).
   - `taxId`: accept only an Israeli ח.פ/ע.מ shape — 9 digits — and reject
     anything else rather than passing it through. Consider the standard
     check-digit validation.
   - Decide explicitly what happens on invalid input: reject the request, or
     silently fall back to the personal name. Do not half-accept.
2. **A real Sumit test.** Issue one actual document against Sumit
   (sandbox if available, otherwise a live minimum-value document) with a
   business name and a tax ID present, then **read the issued document back**
   and confirm the entity name and description are what was intended. Elad is an
   osek patur, so this is a קבלה only — verify the document type did not change.
3. **Its own commit and its own deploy.** Never bundled with UI, content or
   copy changes. The commit message should say plainly that it changes who
   appears on customer receipts.

### Applying

```bash
git apply .patches/business-name-receipt.patch
```

Then re-add the two form fields, do the validation work in step 1, and only
then run step 2. If the patch no longer applies cleanly, treat that as a signal
that the route has moved on and re-derive the change by hand rather than
forcing it.
