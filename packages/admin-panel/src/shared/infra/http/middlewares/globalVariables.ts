import { Request, Response, NextFunction } from 'express';

export const globalVars = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error');
  res.locals.user = req.user;
  res.locals.tenant = req.tenant;
  return next();
};
