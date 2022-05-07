export interface IBreadcrumb {
  name: string;
  href?: string;
}

export interface CustomUser {
  id: number;
  email: string;
  name: string;
  permissions: string[];
}
