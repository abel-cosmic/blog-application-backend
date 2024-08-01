export type RegisterUserInput = {
  email: string;
  password: string;
  name?: string;
  role?: "ADMIN" | "USER";
};

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}
