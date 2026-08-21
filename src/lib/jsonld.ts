/**
 * Safe serialization of JSON-LD for inline `<script type="application/ld+json">`.
 *
 * `JSON.stringify` escapes quotes but NOT `<`, `>`, or `&`. When the result is
 * injected via `dangerouslySetInnerHTML`, a data value containing a sequence
 * like `</script>` (or `<!--`) can break out of the script element and inject
 * arbitrary markup, an XSS vector even for "app-generated" data if any field
 * is ever derived from user/external content.
 *
 * The fix is the standard one: HTML-escape the characters that are meaningful
 * inside a `<script>` context. We escape `<`, `>`, and `&` to their unicode
 * escapes, which keep the JSON byte-for-byte valid (unicode escapes are legal
 * JSON string content) while making it impossible to close the script element.
 * U+2028 / U+2029 (line/paragraph separators) are also escaped defensively, * they are valid in JSON but terminate a JS string literal. The pattern is built
 * from a string of `\u` escapes so the source file contains no raw separators.
 */
const LINE_SEP = new RegExp("[\\u2028\\u2029]", "g");

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(LINE_SEP, (ch) =>
      ch.charCodeAt(0) === 0x2028 ? "\\u2028" : "\\u2029"
    );
}
