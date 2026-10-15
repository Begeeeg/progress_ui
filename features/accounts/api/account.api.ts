import { apiRequest, getApiUrl } from "@/shared/lib/api-client";
import type { AccountProvider, ConnectedAccount } from "../types/account.types";

export async function getConnectedAccounts() {
  const response = await apiRequest<ConnectedAccount[]>("identity/account");
  return response.data;
}

export async function disconnectAccount(
  provider: AccountProvider,
  password: string,
) {
  return apiRequest<null>(
    `identity/account/${provider}`,
    {
      method: "DELETE",
      body: JSON.stringify({ password }),
    },
    false,
  );
}

export function connectAccount(provider: AccountProvider) {
  window.location.assign(
    getApiUrl(`identity/account/${provider}/connect`),
  );
}
