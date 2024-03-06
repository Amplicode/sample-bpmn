export const calcComponentWidth = (columns?: "auto" | number | null) => {
  return columns && columns !== "auto" ? (columns / 16) * 100 + "%" : "100%";
}
