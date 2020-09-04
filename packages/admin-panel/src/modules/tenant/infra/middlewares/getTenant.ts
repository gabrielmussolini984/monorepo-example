import { Request, Response, NextFunction } from 'express';
import { TenantRepository } from '@modules/tenant/infra/sequelize/repositories/TenantRepository';

const tenantRepository = new TenantRepository();

export const getTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const subdomain = req.headers?.host?.split('.');
  if (!subdomain) return res.status(500).end();
  const tenant = await tenantRepository.findBySubdomain({
    fallback_subdomain: subdomain[0],
  });
  if (!tenant) return res.status(500).end();
  req.tenant = tenant;
  return next();
};
