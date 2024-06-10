import { Router } from 'express';

import usersRoutes from './routes/users.routes';
import authsRoutes from './routes/auth.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authsRoutes);

export default routes;
