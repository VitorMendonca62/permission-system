import useUser from '../../hooks/useUser';

export default function Header() {
  const { logoutUser, user } = useUser();
  return (
    <header className="bg-red flex justify-between items-center py-3 px-5 bg-[#f6f6f6] mb-5">
      <h1 className="text-[2rem] font-bold">Desafio</h1>

      {user.auth && (
        <div className="flex gap-3 items-center">
          <p>
            Olá, <strong>{user.username}</strong>
          </p>
          <button
            className="text-white w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-1"
            onClick={logoutUser}
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
