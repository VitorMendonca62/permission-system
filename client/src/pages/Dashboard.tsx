import { useQuery } from 'react-query';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import { getAllSales, getSales } from '../services/api/sale';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [sales, setSales] = useState([]);

  const { user } = useUser();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!user.auth) {
      return navigate('/login');
    }
  }, [navigate, user.auth]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Table sales={sales} />
    </>
  );
}
