import { apiRequest } from "@/shared/lib/api-client";
import type { PublicProfile, UserSearchResult } from "../types/search.types";

export async function searchUsers(query: string) {
  const params = new URLSearchParams({ username: query });
  const response = await apiRequest<UserSearchResult[]>(
    `identity/user/search?${params.toString()}`,
  );
  return response.data;
}

export async function getPublicProfile(username: string) {
  const response = await apiRequest<PublicProfile>(
    `identity/user/search/${encodeURIComponent(username)}`,
  );
  return response.data;
}
