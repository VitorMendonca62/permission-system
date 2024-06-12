import sheet from '../../../sheets';
import ShowUser from '../../user/useCases/ShowUser';

export default class CreateSaleUseCase {
  async execute(sale: ICreateSale) {
    const showUser = new ShowUser();
    const userWithId = await showUser.verifyWithId(sale.userId);

    if(userWithId === null){
      return {
        error: true,
        status: 404,
        msg: 'Usuário não existe',
        data: {},
      };
    }

    try {
      (await sheet).addRow({
        'Id Usuário': sale.userId,
        'Id Venda': sale.saleId,
        'Valor da Venda': sale.salePrice,
      });
      return {
        error: false,
        status: 201,
        msg: 'Venda criada com sucesso',
        data: {},
      };
    } catch (err: any) {
      return {
        error: true,
        status: 400,
        msg: 'Houve um erro ao criar sala. Tente novamente!',
        data: err,
      };
    }
  }
}
