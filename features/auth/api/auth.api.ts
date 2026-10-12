import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types";

function apiEndpoint(feature: "auth" | "user", path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  return `${baseUrl}/identity/${feature}/${path.replace(/^\/+/, "")}`;
}

function authEndpoint(path: string) {
  return apiEndpoint("auth", path);
}

async function readAuthResponse(response: Response): Promise<AuthResponse> {
  const data = (await response.json().catch(() => null)) as AuthResponse | null;

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status})`);
  }

  return data ?? { message: "Request completed successfully." };
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const response = await fetch(authEndpoint("register"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return readAuthResponse(response);
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(authEndpoint("login"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return readAuthResponse(response);
}

export async function verifyEmail(token: string): Promise<AuthResponse> {
  try {
    const response = await fetch(
      `${authEndpoint("verify-email")}?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      },
    );
    return await readAuthResponse(response);
  } catch (verificationError) {
    try {
      const profileResponse = await fetch(apiEndpoint("user", "me"), {
        credentials: "include",
        cache: "no-store",
      });
      if (profileResponse.ok) {
        const profile = (await profileResponse.json()) as {
          data?: { isVerified?: boolean };
        };
        if (profile.data?.isVerified === true) {
          return {
            message: "Your email is verified. You can continue to Progress.",
          };
        }
      }
    } catch {
      // Keep the verification error below; the status check is only a recovery
      // path for cases where the token was consumed but the response failed.
    }

    throw verificationError;
  }
}

export async function resendVerificationEmail(): Promise<AuthResponse> {
  const response = await fetch(authEndpoint("resend-verification"), {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  });
  return readAuthResponse(response);
}

export async function logoutUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/identity/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error("Logout request failed:", response.status);
  }
}
