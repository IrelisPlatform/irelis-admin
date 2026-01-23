export const getFileName = (url: string) => {
  try {
    const decoded = decodeURIComponent(url.split("/").pop() || "");
    return decoded.split("?")[0];
  } catch {
    return "Fichier";
  }
};
