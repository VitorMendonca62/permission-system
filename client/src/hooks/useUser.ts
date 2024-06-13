import { useContext } from 'react';
import { UserContext } from '../context/user';

export default function useUser() {
  const context = useContext<IUserContext | null>(UserContext);
  if (context === null) {
    throw new Error('Algo de errado em UserContext');
  }
  return context;
}
