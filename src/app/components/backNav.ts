// Detail pages opened from the CV (links carry ?from=cv) go back to the CV;
// otherwise they return to the project list.
const fromCv = () => new URLSearchParams(window.location.search).get("from") === "cv";

export const backLabel = () => (fromCv() ? "Back to CV" : "Back to Projects");

export function goBack() {
  if (fromCv() && window.history.length > 1) {
    window.history.back();
    return;
  }
  window.location.hash = "";
}
