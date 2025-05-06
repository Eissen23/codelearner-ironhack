export type User = {
  id: number;
  full_name: string;
  account_name: string;
  email: string;
  email_verified_at?: string | null;
  created_at: Date;
  updated_at: Date;
  about: string | null;
};

export type LoginResponse = {
  token: string;
};

export type RegisterResponse = {
  token: string;
  user: User;
};

export type LogoutResponse = {
  message: string;
  status: number;
};
