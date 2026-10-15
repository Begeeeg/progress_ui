import { apiRequest } from "@/shared/lib/api-client";
import type {
  DeleteUserInput,
  UpdatePasswordInput,
  UpdateProfileInput,
  UserProfile,
} from "../types/user.types";

export async function getCurrentUser() {
  const response = await apiRequest<UserProfile>("identity/user/me");
  return response.data;
}

export async function updateUserInfo(input: UpdateProfileInput) {
  return apiRequest<Pick<UserProfile, "id" | "username" | "givenname" | "surname">>(
    "identity/user/update-info",
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );
}

export async function updatePassword(input: UpdatePasswordInput) {
  return apiRequest<null>("identity/user/update-password", {
    method: "PATCH",
    body: JSON.stringify(input),
  }, false);
}

export async function deleteUser(input: DeleteUserInput) {
  return apiRequest<null>("identity/user/me", {
    method: "DELETE",
    body: JSON.stringify(input),
  }, false);
}
