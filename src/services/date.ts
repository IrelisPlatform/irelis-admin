

/**
 * Format long lisible (ex: 17 décembre 2025 à 22:13)
 */
export const formatDateLong = (date?: string): string => {
    if (!date) return "—";

    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",

    }).format(new Date(date));
};

/**
 * Format court (ex: 17/12/2025)
 */
export const formatDateShort = (date?: string): string => {
    if (!date) return "—";

    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
};

/**
 * Format humain (ex: il y a 3 jours)
 */
export const formatDateRelative = (date?: string): string => {
    if (!date) return "—";

    const seconds = Math.floor(
        (Date.now() - new Date(date).getTime()) / 1000
    );

    const intervals = [
        { label: "an", seconds: 31536000 },
        { label: "mois", seconds: 2592000 },
        { label: "jour", seconds: 86400 },
        { label: "heure", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `il y a ${count} ${interval.label}${count > 1 ? "s" : ""}`;
        }
    }

    return "à l’instant";
};
