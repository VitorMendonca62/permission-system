import { Router } from 'express';
import { SalesController } from '../app/controllers/SalesController';

const routes = Router();


const salesController = new SalesController();

routes.post('/', salesController.store);
routes.get('one/:id', salesController.show);
routes.get('/all', salesController.index);

export default routes;
