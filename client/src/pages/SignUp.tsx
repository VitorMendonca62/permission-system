import InputForms from '../components/InputForms';
import { useForm } from 'react-hook-form';
import { userPostSchema } from '../schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {  handleErrors } from '../utils/forms';
import { signUP } from '../services/api/user';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function SignUp() {
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [visibleMessage, setVisibleMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInput>({
    resolver: zodResolver(userPostSchema),
  });

  if (Object.keys(errors).length > 0) {
    handleErrors(errors);
  } 

  const createUser = async (dataForm: IUserInput) => {
    const { msg } = await signUP(dataForm);
    setButtonIsDisabled(true);
    setMessage(msg);
    setVisibleMessage(true);

    setTimeout(() => {
      setButtonIsDisabled(false);
      setVisibleMessage(false);
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
        onSubmit={handleSubmit(createUser)}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Cadastrar</h2>
        <InputForms
          nameInput="username"
          placeholder="VitorMendonca"
          title="Apelido"
          type="text"
          register={register}
        />
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
        <InputForms
          nameInput="confirmPassword"
          placeholder="********"
          title="Confirmar senha"
          type="password"
          register={register}
        />

        <button
          type="submit"
          disabled={buttonIsDisabled}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
