import jwt from 'jsonwebtoken';
import ShowUser from './ShowUser';
import bcrypt from 'bcryptjs';
import authConfig from '../../../config/auth';

export default class LoginUser {
  showUser = new ShowUser();

  verifyPassword(userPassword: string, inputPassword: string) {
    return bcrypt.compareSync(inputPassword, userPassword);
  }

  async execute(email: string, password: string) {
    const user = await this.showUser.verifyWithEmail(email);

    if (user === null || !this.verifyPassword(user.password, password)) {
      return {
        error: true,
        status: 404,
        msg: 'Email ou senha estão incorretos.',
        data: {},
      };
    }

    const { secret, expiresIn } = authConfig;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      secret,
      { expiresIn },
    );

    return {
      username: user.username,
      id: user.id,
      auth: true,
      role: user.role,
      token,
      msg: 'Usuário logado com sucesso!',
      error: false,
      status: 201,
      data: {},
    };
  }
}
