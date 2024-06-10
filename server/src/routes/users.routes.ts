import { Router } from 'express';
import { UserController } from '../app/controllers/UserController';

const routes = Router();

const userController = new UserController();

// routes.get("/", UserController.index)
// routes.get("/:id", UserController.show)
routes.post('/', userController.store);

export default routes;
