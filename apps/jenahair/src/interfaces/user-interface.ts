export interface ICreateUser {
  email: string;
  password: string;
  name?: string;
};

export interface IUserResponse {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt?: string;
}

export interface IUpdatePassword {
  userId: string;
  newPassword: string;
}