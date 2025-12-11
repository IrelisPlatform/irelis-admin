// src/utils/date.ts
/**
 * Convertit une chaîne "YYYY-MM" en date ISO 8601 au format "YYYY-MM-DDTHH:mm:ss.sssZ"
 * Ex: "2023-05" → "2023-05-01T00:00:00.000Z"
 */
export const monthStringToIsoDate = (monthStr: string): string | null => {
  if (!monthStr || monthStr.length !== 7 || monthStr[4] !== '-') {
    return null;
  }
  const date = new Date(`${monthStr}-01T00:00:00.000Z`);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString(); // ✅ toujours valide pour le backend
};