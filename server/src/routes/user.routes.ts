import { Router } from 'express';
import { UserController } from '../app/controllers/UserController';
import CreateUserUseCase from '../modules/user/useCases/CreateUser';

const routes = Router();

const userController = new UserController();

// routes.get("/", UserController.index)
// routes.get("/:id", UserController.show)
routes.post('/', userController.store);

export default routes;
