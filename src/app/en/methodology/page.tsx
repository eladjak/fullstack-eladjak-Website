// EN methodology route — reuses the same component as the HE page.
// Locale is inferred from the URL path by LocaleProvider (/en/*),
// so `useTranslations('methodology')` automatically resolves the
// English copy from messages/en.json.
export { default } from "@/app/methodology/page";
