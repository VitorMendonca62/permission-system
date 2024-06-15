import { useState } from 'react';
import InputForms from '../InputForms';
import { Modal } from '../Modal';
import Toast from '../Toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { salesSchemas } from '../../schemas/sale';
import { clearInputs, handleErrors } from '../../utils/forms';
import { addSalesApi } from '../../services/api/sale';
import useUser from '../../hooks/useUser';

interface IAddSalesProps {
  visibleModal: boolean;
  changeModalNotVisible: () => void;
  refetch: () => void;
}

export default function AddSale(props: IAddSalesProps) {
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [visibleMessage, setVisibleMessage] = useState(false);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<ISale>({
    resolver: zodResolver(salesSchemas),
  });

  setValue('userId', user.id);

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    handleErrors(errors);
  } else {
    clearInputs();
  }

  const addSale = async (dataForm: ISale) => {

    const { msg, error } = await addSalesApi(dataForm, user.id);
    setButtonIsDisabled(true);
    setMessage(msg);
    setVisibleMessage(true);
    if (!error) {
      console.log("OI")
      console.log(props.refetch)
      props.refetch();
    }

    setTimeout(() => {
      setButtonIsDisabled(false);
      setVisibleMessage(false);
      if (!error) {
        const namesInputs: InputsSale[] = ['userId', 'saleId', 'salePrice'];
        namesInputs.forEach((input) => setValue(input, 0));
      }
    }, 2000);
  };

  return (
    <div className="overflow-hidden">
      <Toast
        msg={message}
        visibleMessage={visibleMessage}
        setVisibleMessage={setVisibleMessage}
      />

      <Modal
        title={'Adicionar venda'}
        visibleModal={props.visibleModal}
        changeModalNotVisible={props.changeModalNotVisible}
      >
        <form
          className="max-w-sm mx-auto px-6"
          onSubmit={handleSubmit(addSale)}
        >
          {user.role === 'admin' && (
            <InputForms
              nameInput="userId"
              placeholder="01"
              title="ID de usuário"
              type="number"
              register={register}
            />
          )}

          <InputForms
            nameInput="saleId"
            placeholder="202401"
            title="ID de venda"
            type="number"
            register={register}
          />
          <InputForms
            nameInput="salePrice"
            placeholder="1417,74"
            title="Preço da venda"
            type="number"
            register={register}
          />

          <button
            type="submit"
            disabled={buttonIsDisabled}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-1"
          >
            Adicionar
          </button>
        </form>
      </Modal>
    </div>
  );
}
