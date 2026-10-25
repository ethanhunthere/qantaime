export function formatCurrency(amountEur: number, currency: "EUR" | "USD" | "GBP" = "EUR"): string {
  const rates = {
    EUR: 1.0,
    USD: 1.08,
    GBP: 0.85,
  };

  const converted = amountEur * rates[currency];

  return new Intl.NumberFormat(currency === "EUR" ? "de-DE" : "en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(converted);
}

export function formatDimensions(dimensions: { widthMm: number; heightMm: number; depthMm: number }): string {
  const wCm = (dimensions.widthMm / 10).toFixed(1);
  const hCm = (dimensions.heightMm / 10).toFixed(1);
  const dCm = (dimensions.depthMm / 10).toFixed(1);
  return `${wCm} × ${hCm} × ${dCm} cm`;
}

export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
  return `${grams} g`;
}
