export interface Paginated<T> {
  data: T[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
    current: string;
  };
}
