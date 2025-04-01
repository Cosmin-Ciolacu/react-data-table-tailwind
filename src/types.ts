type DataTableColumns<T> = {
  header: string;
  accessor: keyof T;
  searchable?: boolean;
  renderRow?: (item: T, index?: number) => React.ReactNode;
  onSearch?: (accessor: keyof T, value: string) => void;
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
