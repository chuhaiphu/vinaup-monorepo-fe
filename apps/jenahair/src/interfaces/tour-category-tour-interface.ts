import { ITourResponse } from "./tour-interface";
import { ITourCategoryResponse } from "./tour-category-interface";

export interface ICreateTourCategoryTour {
  tourCategoryId: string;
  tourId: string;
  sortOrder?: number;
}

export interface IUpdateTourCategoryTour {
  sortOrder?: number;
}

export interface ITourCategoryTourResponse {
  id: string;
  tourCategoryId: string;
  tourId: string;
  sortOrder: number;
  tourCategory?: ITourCategoryResponse;
  tour?: ITourResponse;
}

