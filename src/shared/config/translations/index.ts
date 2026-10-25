import { sq } from "./sq";
import { en } from "./en";
import { it } from "./it";

export type Language = "sq" | "en" | "it";

export const translations: Record<Language, typeof sq> = {
  sq,
  en,
  it,
};

export const LANGUAGE_LABELS: Record<Language, { label: string; flag: string }> = {
  sq: { label: "Shqip", flag: "🇦🇱" },
  en: { label: "English", flag: "🇬🇧" },
  it: { label: "Italiano", flag: "🇮🇹" },
};
