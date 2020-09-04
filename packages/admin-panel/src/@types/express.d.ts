interface ITenant {
  id: string;
  company: string;
  site: string;
  fallback_subdomain: string;
}
declare namespace Express {
  export interface Request {
    tenant: ITenant;
  }
}
