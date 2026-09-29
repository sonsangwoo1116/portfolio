// Detail pages opened from the CV (links carry ?from=cv) go back to the CV page;
// otherwise they return to the project list.
const fromCv = () => new URLSearchParams(window.location.search).get("from") === "cv";

export const backLabel = () => (fromCv() ? "Back to CV" : "Back to Projects");

export function goBack() {
  if (fromCv()) {
    window.location.href = `${import.meta.env.BASE_URL}cv.html`;
    return;
  }
  window.location.hash = "";
}
