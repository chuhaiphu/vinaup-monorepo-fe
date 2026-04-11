export interface ICreateCustomerContact {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  recaptchaToken?: string;
}

export interface ICustomerContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  createdAt: Date;
}

