export const fetcher = async (url: string, options?: RequestInit) => {
  const BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    if (!response.ok) {
      return Promise.reject(await response.text());
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : String(error),
    );
  }
};
