export interface ApiResponse<T> {
  message: string;
  data: T;
}

export function getApiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  return `${baseUrl}/${path.replace(/^\/+/, "")}`;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  expectsData = true,
): Promise<ApiResponse<T>> {
  const response = await fetch(getApiUrl(path), {
    ...options,
    credentials: "include",
    cache: "no-store",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const payload = (await response.json().catch(() => null)) as
    | Partial<ApiResponse<T>>
    | null;

  if (!response.ok) {
    throw new Error(
      typeof payload?.message === "string"
        ? payload.message
        : `Request failed (${response.status})`,
    );
  }

  if (
    !payload ||
    typeof payload.message !== "string" ||
    (expectsData && !("data" in payload))
  ) {
    throw new Error("The server returned an invalid response.");
  }

  return payload as ApiResponse<T>;
}
