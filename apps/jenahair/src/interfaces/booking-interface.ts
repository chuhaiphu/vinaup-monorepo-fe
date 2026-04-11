import { ITourResponse } from "./tour-interface";

export interface ICreateBooking {
  tourId: string;
  adultCount: number;
  childCount: number;
  adultPrice: number;
  childPrice: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes?: string;
  recaptchaToken?: string;
}

export interface IUpdateBooking extends Partial<ICreateBooking> {
  status?: string;
}

export interface IBookingResponse {
  id: string;
  tourId: string;
  tour: ITourResponse;
  status: string;
  adultCount: number;
  childCount: number;
  adultPrice: number;
  childPrice: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

