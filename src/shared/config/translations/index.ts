import { sq } from "./sq";
import { en } from "./en";

export type Language = "sq" | "en";

export const translations: Record<Language, typeof sq> = {
  sq,
  en,
};

export const LANGUAGE_LABELS: Record<Language, { label: string; flag: string }> = {
  sq: { label: "Shqip", flag: "🇽🇰" },
  en: { label: "English", flag: "🇬🇧" },
};
