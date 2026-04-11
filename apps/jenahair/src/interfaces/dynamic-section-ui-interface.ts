import { ISectionUICredentialsResponse } from "./section-ui-credentials-interface";

export interface ICreateDynamicSectionUI {
  position: number;
  sectionUICredentialsId?: string | null;
  properties?: Record<string, unknown> | null;
}

export interface IUpdateDynamicSectionUI {
  position?: number;
  sectionUICredentialsId?: string | null;
  properties?: Record<string, unknown> | null;
}

export interface IDynamicSectionUIResponse {
  id: string;
  position: number;
  sectionUICredentialsId: string | null;
  sectionUICredentials?: ISectionUICredentialsResponse | null;
  properties: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
