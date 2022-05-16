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

export const MESSAGE_SUCCESS = 'Phản hồi thành công';
export const MESSAGE_FAIL = 'Phản hồi không thành công';
export const ADMIN = 'administrator';
export const USER = 'normal user';
