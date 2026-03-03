const API_BASE_URL = import.meta.env.VITE_API_URL;

async function fetcher<T, B = unknown>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: B
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export const api = {
    get: <T>(endpoint: string) => fetcher<T>(endpoint, 'GET'),
    post: <T, B>(endpoint: string, body: B) => fetcher<T, B>(endpoint, 'POST', body),
};
