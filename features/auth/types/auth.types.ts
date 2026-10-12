import { ChangeEventHandler, ReactNode } from "react";

export interface RegisterPayload {
  username: string;
  givenname: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  data?: {
    isVerified?: boolean;
  };
}

export interface AuthCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface LoginPayload {
  email: string;
  password: string;
}
