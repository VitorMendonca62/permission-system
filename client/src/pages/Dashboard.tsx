import { useQuery } from 'react-query';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import { getAllSales, getSales } from '../services/api/sale';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import AddSale from './AddSale';

export default function Dashboard() {
  const [sales, setSales] = useState<ISale[] | []>([]);
  const [visibleModalSignUp, setVisibleModalSignUp] = useState<boolean>(false);
  const [visibleModalSales, setVisibleModalSales] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  const { isLoading, refetch } = useQuery({
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
    refetch();
    if (!user.auth) {
      return navigate('/login');
    }
  }, [navigate, refetch, user?.auth]);

  const handleStateModalSignUp = () => {
    setVisibleModalSignUp(true);
  };

  const changeSignUpModalNotVisible = () => {
    setVisibleModalSignUp(false);
  };

  const handleStateModalSales = () => {
    setVisibleModalSales(true);
  };

  const changeSalesModalNotVisible = () => {
    setVisibleModalSales(false);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Table sales={sales} />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-1"
        onClick={handleStateModalSales}
      >
        Adicionar venda
      </button>
      {user.role === 'admin' && (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-1"
          onClick={handleStateModalSignUp}
        >
          Cadastrar usuário
        </button>
      )}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-1"
        onClick={logoutUser}
      >
        Sair
      </button>

      <SignUp
        visibleModal={visibleModalSignUp}
        changeModalNotVisible={changeSignUpModalNotVisible}
      />
      <AddSale
        visibleModal={visibleModalSales}
        changeModalNotVisible={changeSalesModalNotVisible}
        refetch={refetch}
      />
    </>
  );
}
