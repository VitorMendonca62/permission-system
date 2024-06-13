interface IPropsTable {
  sales: ISale[];
}

export default function Table(props: IPropsTable) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[60%]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              ID do usuário
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              ID da venda
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Preço da venda
            </th>
          </tr>
        </thead>
        <tbody>
          {props.sales?.map((sale) => (
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 w-3 text-center">
                {sale.userId}
              </th>
              <td className="px-6 py-4 w-3 text-center"> {sale.saleId}</td>
              <td className="px-6 py-4 w-10 text-center">{sale.salePrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
