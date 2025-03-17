type DataTableColumns<T> = {
  header: string;
  accessor: keyof T;
  renderRow?: (item: T) => React.ReactNode;
};

export type Columns<T> = DataTableColumns<T>[];

export type DataTableProps<T> = {
  columns: DataTableColumns<T>[];
  data: T[];
  loading?: boolean;
  usePagination?: boolean;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  dark?: boolean;
  containerClassName?: string;
};
