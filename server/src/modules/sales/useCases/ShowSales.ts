// import ShowUser from '../../user/useCases/ShowUser';

import sheet from '../../../sheets';
export default class ShowSales {
  async showUserSale(idUser: number) {
    let sales: ICreateSale[] = [];

    const rows = (await sheet).getRows();

    (await rows).forEach((row) => {
      if (row._rawData[0] == idUser) {
        const values = row._rawData;
        const sale: ICreateSale = {
          userId: values[0],
          saleId: values[1],
          salePrice: values[2],
        };
        sales.push(sale);
      }
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
      const values = row._rawData;
      const sale: ICreateSale = {
        userId: values[0],
        saleId: values[1],
        salePrice: values[2],
      };
      return sale;
    });

    return {
      error: false,
      status: 200,
      msg: 'Aqui estão todas as vendas.',
      data: sales,
    };
  }
}
