export const calcComponentWidth = (columns?: "auto" | number) => {
  return columns && columns !== "auto" ? (columns / 16) * 100 + "%" : "100%";
}
