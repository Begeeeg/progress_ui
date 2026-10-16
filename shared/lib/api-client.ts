export interface ApiResponse<T> {
  message: string;
  data: T;
}

export function getApiUrl(path: string) {
  const publicBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  const backend = process.env.BACKEND_URL?.replace(/\/+$/, "");

  // A relative base like "/api/v1" only resolves in the browser.
  // On the server there is no origin, so call the backend directly.
  const isServer = typeof window === "undefined";
  const baseUrl =
    isServer && publicBase?.startsWith("/")
      ? backend
        ? `${backend}${publicBase}`
        : undefined
      : publicBase;

  if (!baseUrl) {
    throw new Error(
      "API base URL is not configured (NEXT_PUBLIC_API_URL / BACKEND_URL).",
    );
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

  const payload = (await response.json().catch(() => null)) as Partial<
    ApiResponse<T>
  > | null;

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
