export const REPORT_STORAGE_KEY = "trading-places-report";

export const deriveLearningsFromNotes = (notes = "") => {
  const cleaned = notes
    .split(/\n|[.?!]/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!cleaned.length) {
    return [
      "You practiced swapping perspectives to surface hidden needs.",
      "Naming feelings before policies kept the interaction calmer.",
      "Narrating next steps out loud improved trust in the process.",
    ];
  }

  return cleaned.slice(0, 4);
};

export const deriveImprovementTips = (metrics = {}, notes = "") => {
  const empathy = metrics["Empathy signaled"] ?? metrics.empathy ?? 3;
  const understanding = metrics.Understanding ?? metrics.understanding ?? 3;
  const clarity =
    metrics["Clarity of next steps"] ?? metrics.Clarity ?? metrics.clarity ?? 3;

  const tips = [];

  if (empathy < 4) {
    tips.push("Name the emotion you hear in the first sentence before offering fixes.");
  }
  if (understanding < 4) {
    tips.push("Mirror back the need in your own words, then invite corrections.");
  }
  if (clarity < 4.2) {
    tips.push("Narrate the next two steps with a clear time bound so trust stays high.");
  }
  if (notes?.toLowerCase().includes("tone")) {
    tips.push("Match tone to pace—slow your delivery when tensions spike.");
  }
  if (!tips.length) {
    tips.push("Lock in the habit: empathy line, option A/B, and a dated confirmation.");
  }

  return tips.slice(0, 4);
};

export const formatReportDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
