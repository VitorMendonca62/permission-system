import { useQuery } from 'react-query';
import Table from '../components/Table';
import { UserContext } from '../context/user';
import { useContext, useState } from 'react';
import { getAllSales, getSales } from '../services/api/sale';

export default function Dashboard() {
  const [sales, setSales] = useState([]);

  const context = useContext<IUserContext | null>(UserContext);
  const user = context?.user;

  const { isLoading } = useQuery({
    queryKey: `getData`,
    queryFn: async () => {
      try {
        const _sales =
          user?.role === 'admin'
            ? await getAllSales()
            : user?.role === 'user'
            ? await getSales(user.id)
            : [];

        setSales(_sales.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Table sales={sales} />
    </>
  );
}
