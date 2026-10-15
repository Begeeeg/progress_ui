import type { AccountProvider } from "@/features/accounts/types/account.types";

export interface UserSearchResult {
  id: string;
  username: string;
  givenname: string;
  surname: string;
  isOnline: boolean;
}

export interface PublicProfile {
  id: string;
  username: string;
  givenname: string;
  surname: string;
  avatarUrl: string | null;
  createdAt: string;
  linkedAccounts: Array<{
    provider: AccountProvider;
    username: string | null;
    avatarUrl: string | null;
    profileUrl: string | null;
    createdAt: string;
  }>;
}
