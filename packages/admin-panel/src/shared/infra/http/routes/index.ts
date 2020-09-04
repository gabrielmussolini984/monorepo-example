import express from 'express';
import { isAuthenticated } from '@modules/user/infra/middlewares/isAuthenticated';

import CategoryRoutes from '@modules/category/infra/routes/CategoryRoutes';
import PlanRoutes from '@modules/plan/infra/routes/PlanRoutes';
import SessionRoutes from '@modules/user/infra/routes/SessionRoutes';
import UserRoutes from '@modules/user/infra/routes/UserRoutes';
import CustomerRoutes from '@modules/customer/infra/routes/CustomerRoutes';
// import CustomerRoutes from './CustomerRoutes';

const routes = express.Router();

routes.use('/', SessionRoutes);
routes.use('/user', UserRoutes);

routes.use(isAuthenticated);
routes.use('/category', CategoryRoutes);
routes.use('/plan', PlanRoutes);
routes.use('/customer', CustomerRoutes);

export default routes;
