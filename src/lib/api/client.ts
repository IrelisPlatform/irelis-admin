
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!API_BASE_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is missing in environment variables. ' +
    'Create a .env.local file with this variable.'
  );
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  let responseData: any = null;
  try {
    responseData = await response.json();
  } catch (e) {
   console.error(e);
  }


  if (!response.ok) {
    const message =
      responseData?.message ||
      responseData?.error ||
      `Erreur ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  return responseData as T;
}