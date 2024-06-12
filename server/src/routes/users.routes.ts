import { Router } from 'express';
import { UserController } from '../app/controllers/UserController';
import auth from '../app/middlewares/auth';
import adminMiddleware from '../app/middlewares/admin';

const routes = Router();

const userController = new UserController();

routes.use(auth);
// routes.get("/", UserController.index)
// routes.get("/:id", UserController.show)

routes.use(adminMiddleware);
routes.post('/', userController.store);

export default routes;
