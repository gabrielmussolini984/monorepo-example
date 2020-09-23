export interface IUserValidate {
  result: boolean;
  data?: {
    name: string;
    email: string;
    password: string;
    tenant_id: string;
  };
}
