import { ITourCategoryCustomTourRequestResponse } from "./tour-category-custom-tour-request-interface";

export interface ICreateCustomTourRequest {
  startDate: Date;
  endDate: Date;
  adultCount: number;
  childCount: number;
  destinations: string[];
  hotelType?: string;
  roomType?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes?: string;
  recaptchaToken?: string;
}

export type IUpdateCustomTourRequest = Partial<ICreateCustomTourRequest>

export interface ICustomTourRequestResponse {
  id: string;
  startDate: Date;
  endDate: Date;
  adultCount: number;
  childCount: number;
  destinations: string[];
  hotelType: string | null;
  roomType: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes: string | null;
  tourCategoryCustomTourRequests?: ITourCategoryCustomTourRequestResponse[];
  createdAt: Date;
  updatedAt: Date;
}

