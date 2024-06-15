import InputForms from '../components/InputForms';
import { useForm } from 'react-hook-form';
import { userLoginSchema } from '../schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleErrors } from '../utils/forms';
import { signIn } from '../services/api/user';
import { useEffect, useState } from 'react';
import Toast from '../components/Toast';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [visibleMessage, setVisibleMessage] = useState(false);

  const { updateUser, user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInput>({
    resolver: zodResolver(userLoginSchema),
  });

  if (Object.keys(errors).length > 0) {
    handleErrors(errors);
  }

  useEffect(() => {
    if (user.auth) {
      return navigate('/dashboard');
    }
  }, [navigate, user.auth]);

  const loginUser = async (dataForm: IUserInput) => {
    const { msg, error, token, auth, username, id, role } = await signIn(
      dataForm,
    );
    setButtonIsDisabled(true);
    setMessage(msg);
    setVisibleMessage(true);

    localStorage.setItem('USER_TOKEN', token);

    setTimeout(() => {
      if (error) {
        setButtonIsDisabled(false);
        setVisibleMessage(false);
        return;
      }
      if (updateUser) {
        updateUser({
          id,
          auth,
          isLogged: !error,
          token,
          username,
          role,
        });
      }
    }, 3500);
  };

  return (
    <div>
      <Toast
        msg={message}
        visibleMessage={visibleMessage}
        setVisibleMessage={setVisibleMessage}
      />
      <form
        className="max-w-sm mx-auto px-6"
        onSubmit={handleSubmit(loginUser)}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Login</h2>
        <InputForms
          nameInput="email"
          placeholder="vitorqueiroz325@gmail.com"
          title="Email"
          type="email"
          register={register}
        />
        <InputForms
          nameInput="password"
          placeholder="********"
          title="Senha"
          type="password"
          register={register}
        />

        <button
          type="submit"
          disabled={buttonIsDisabled}
          className={`text-white bg-blue-700 ${
            !buttonIsDisabled &&
            'hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
          }  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-30`}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
