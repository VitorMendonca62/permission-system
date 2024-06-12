// import ShowUser from '../../user/useCases/ShowUser';

import sheet from '../../../sheets';
export default class ShowSales {
  async showUserSale(idUser: number, token: string) {
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
