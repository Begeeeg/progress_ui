export interface UserProfile {
  id: string;
  username: string;
  givenname: string;
  surname: string;
  email: string;
  isOnline: boolean;
  isVerified: boolean;
}

export interface UpdateProfileInput {
  username?: string;
  givenname?: string;
  surname?: string;
  password: string;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface DeleteUserInput {
  password: string;
}
