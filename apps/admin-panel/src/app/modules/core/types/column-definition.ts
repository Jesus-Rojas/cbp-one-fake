import { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ColumnDefinition<T = any> {
  id: string;
  header: string;
  field?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  filterValue?: Function;
  grow?: number;
  renderer?: (row: T) => ReactElement;
  rendererCellClass?: (row: T) => string | null;
  filterable?: boolean;
}
