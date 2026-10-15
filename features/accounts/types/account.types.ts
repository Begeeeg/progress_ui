export type AccountProvider = "github" | "google" | "facebook" | "linkedin";

export interface ConnectedAccount {
  id: string;
  provider: AccountProvider;
  providerAccountId: string;
  username: string | null;
  email: string | null;
  avatarUrl: string | null;
  profileUrl: string | null;
  scopes: string[];
  createdAt: string;
  updatedAt: string;
}
