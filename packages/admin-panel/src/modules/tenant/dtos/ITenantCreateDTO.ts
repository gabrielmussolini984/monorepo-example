export interface ICreateTenantDTO {
  company: string;
  is_admin?: boolean;
  fallback_subdomain: string;
}
