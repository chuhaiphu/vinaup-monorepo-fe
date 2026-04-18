export interface ICreateMenu {
  title: string;
  customUrl?: string;
}

export interface IUpdateMenu extends Partial<ICreateMenu> {
  title?: string;
  description?: string;
  parentId?: string;
  customUrl?: string;
  sortOrder?: number;
}

export interface IMenuResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: IMenuResponse | null;
  children?: IMenuResponse[];
  customUrl: string | null;
  isRoot: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

