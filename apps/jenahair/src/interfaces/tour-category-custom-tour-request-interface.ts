import { ITourCategoryResponse } from "./tour-category-interface";
import { ICustomTourRequestResponse } from "./custom-tour-request-interface";

export interface ICreateTourCategoryCustomTourRequest {
  tourCategoryId: string;
  customTourRequestId: string;
}

export interface ITourCategoryCustomTourRequestResponse {
  id: string;
  tourCategoryId: string;
  customTourRequestId: string;
  tourCategory?: ITourCategoryResponse;
  customTourRequest?: ICustomTourRequestResponse;
}

