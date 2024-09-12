export interface Paginated<T> {
  apiVersion?: string;
  message: string;
  success: boolean;
  data: T[];
  meta: {
    limit: number;
    total: number;
    page: number;
    pages: number;
  };

  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    previous: string;
  };
}
