// import ShowUser from '../../user/useCases/ShowUser';

import sheet from '../../../sheets';
import { foundUserByToken } from '../../../utils/user';
import ShowUser from '../../user/useCases/ShowUser';

export default class ShowSales {
  async showUserSale(idUser: number, token: string) {
    const showUser = new ShowUser();
    const user = await showUser.verifyWithId(idUser);

    if (user === null) {
      return {
        error: true,
        status: 404,
        msg: 'Usuário não existe',
        data: {},
      };
    }

    const userInToken = await foundUserByToken(token);

    if (userInToken == null || userInToken.id !== idUser) {
      return {
        error: true,
        status: 400,
        msg: 'Algo de errado na autenticação',
        data: {},
      };
    }

    let sales: ICreateSale[] = [];

    const rows = (await sheet).getRows();

    (await rows).forEach((row) => {
      return row._rawData[0] == idUser ? sales.push(row._rawData) : false;
    });

    return {
      error: false,
      status: 200,
      msg: 'Aqui estão todas as vendas.',
      data: sales,
    };
  }
  async showAll() {
    const rows = (await sheet).getRows();
    const sales = (await rows).map((row) => {
      return row._rawData;
    });

    return {
      error: false,
      status: 200,
      msg: 'Aqui estão todas as vendas.',
      data: sales,
    };
  }
}
