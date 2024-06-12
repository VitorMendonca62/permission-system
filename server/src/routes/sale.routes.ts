import { Router } from 'express';
import { SalesController } from '../app/controllers/SalesController';
import adminMiddleware from '../app/middlewares/admin';
import authMiddleware from '../app/middlewares/auth';
import userInSaleMiddleware from '../app/middlewares/userInSale';

const routes = Router();

const salesController = new SalesController();

routes.use(userInSaleMiddleware)
routes.post('/', salesController.store);
routes.get('/one/:id', salesController.show);

routes.use(adminMiddleware);
routes.get('/all', salesController.index);

export default routes;
