import InputForms from '..//InputForms';
import { useForm } from 'react-hook-form';
import { userPostSchema } from '../../schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { clearInputs, handleErrors } from '../../utils/forms';
import { signUP } from '../../services/api/user';
import { useState } from 'react';
import Toast from '..//Toast';
import { Modal } from '..//Modal';

interface ISignUpProps {
  visibleModal: boolean;
  changeModalNotVisible: () => void;
}

export default function SignUp(props: ISignUpProps) {
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [visibleMessage, setVisibleMessage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUserInput>({
    resolver: zodResolver(userPostSchema),
  });

  if (Object.keys(errors).length > 0) {
    handleErrors(errors);
  } else {
    clearInputs();
  }

  const createUser = async (dataForm: IUserInput) => {
    const { msg } = await signUP(dataForm);
    setButtonIsDisabled(true);
    setMessage(msg);
    setVisibleMessage(true);

    setTimeout(() => {
      setButtonIsDisabled(false);
      setVisibleMessage(false);
      const namesInputs: InputsUser[] = [
        'password',
        'username',
        'email',
        'confirmPassword',
      ];
      namesInputs.forEach((input) => setValue(input, ''));
    }, 2000);
  };

  return (
    <div className='overflow-hidden'>
      <Toast
        msg={message}
        visibleMessage={visibleMessage}
        setVisibleMessage={setVisibleMessage}
      />

      <Modal
        title={'Cadastrar'}
        visibleModal={props.visibleModal}
        changeModalNotVisible={props.changeModalNotVisible}
      >
        <form
          className="max-w-sm mx-auto px-6"
          onSubmit={handleSubmit(createUser)}
        >
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
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-1"
          >
            Cadastrar
          </button>
        </form>
      </Modal>
    </div>
  );
}
