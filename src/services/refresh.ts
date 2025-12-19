export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(url, {
        ...options,
        credentials: 'include',
    });

    if (res.status === 401) {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/otp/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if (refreshRes.ok) {
            return fetch(url, {
                ...options,
                credentials: 'include',
            });
        } else {
            throw new Error('Session expirée, veuillez vous reconnecter.');
        }
    }

    return res;
};
