export interface EntitiesTableColumnProps<TEntity, TExtra = undefined> {
  key: string;
  width?: number | string;
  headerAlign?: 'left' | 'right' | 'center';
  cellAlign?: 'left' | 'right' | 'center';
  header: React.ReactNode;
  render: (ctx: { entity: TEntity; extra?: TExtra }) => React.ReactNode;
}

export interface EntitiesTableProps<TEntity, TExtra = undefined> {
  data: TEntity[];
  loading: boolean;
  columns: EntitiesTableColumnProps<TEntity, TExtra>[];
  classNames?: {
    wrapper?: string;
    table: {
      table?: string;
      thead?: string;
      tbody?: string;
      tr?: string;
      th?: string;
      td?: string;
    }
  };
}