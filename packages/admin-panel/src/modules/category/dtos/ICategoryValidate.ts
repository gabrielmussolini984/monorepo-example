export interface ICategoryValidate {
  result: boolean;
  data?: {
    name: string;
    description: string;
    tenant_id: string;
  };
}
