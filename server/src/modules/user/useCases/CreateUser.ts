import { prisma } from '../../../app';
import ShowUser from './ShowUser';
import bcrypt from 'bcryptjs';

export default class CreateUserUseCase {
  showUser = new ShowUser();

  async execute(user: IUserInCreate) {
    const { email, password: _password, username } = user;

    const userWithUsername = await this.showUser.verifyWithUsername(
      username.toLowerCase(),
    );

    if (userWithUsername != null) {
      return {
        error: true,
        status: 400,
        msg: 'Já existe um usuário com esse username. Tente novamente',
        data: {},
      };
    }

    const userWithEmail = await this.showUser.verifyWithEmail(
      email.toLowerCase(),
    );

    if (userWithEmail != null) {
      return {
        error: true,
        status: 400,
        msg: 'Já existe um usuário com esse email. Tente novamente',
        data: {},
      };
    }

    const password = bcrypt.hashSync(String(user.password), 10);

    prisma.users
      .create({
        data: {
          username: username.toLowerCase(),
          email,
          password,
          // role: "admin"
        },
      })
      .then();

    return {
      error: false,
      status: 201,
      msg: 'Usuário criado com sucesso.',
      data: {},
    };
  }
}
