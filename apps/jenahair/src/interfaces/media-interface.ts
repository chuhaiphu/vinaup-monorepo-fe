export interface ICreateMedia {
  name: string;
  title?: string | null;
  description?: string | null;
  url: string;
  type: string;
  folder: string;
}

export interface IUpdateMedia {
  name?: string;
  title?: string | null;
  description?: string | null;
  folder?: string;
}

export interface IMediaResponse {
  id: string;
  name: string;
  title: string | null;
  description: string | null;
  url: string;
  type: string;
  folder: string;
  createdAt: Date;
  updatedAt: Date;
}
