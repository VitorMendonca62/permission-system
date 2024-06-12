import { Router } from 'express';

import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import saleRoutes from './routes/sale.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/sales', saleRoutes);

export default routes;
