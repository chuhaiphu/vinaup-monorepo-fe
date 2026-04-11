export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE';

export interface IActionLog {
  id: string;
  userId: string | null;
  action: ActionType;
  entityType: string;
  entityId: string;
  ipAddress: string | null;
  createdAt: Date;
}

export interface ICreateActionLog {
  userId?: string | null;
  action: ActionType;
  entityType: string;
  entityId: string;
  ipAddress?: string | null;
}
