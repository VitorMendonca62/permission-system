import { ReactNode, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface IModalProps {
  title: string;
  visibleModal: boolean;
  children?: ReactNode;
  changeModalNotVisible: () => void;
}

export function Modal(props: IModalProps) {
  const [visibleModal, setVisibleModal] = useState<boolean>(props.visibleModal);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = () => {
    setVisibleModal(false);
    props.changeModalNotVisible();
  };

  return (
    <>
      {(visibleModal || props.visibleModal) && (
        <div
          aria-hidden="true"
          ref={modalRef}
          className="overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div
            className="bg-[rgb(255,255,255,0.1)] h-full w-full absolute backdrop-blur-sm z-40"
            onClick={handleCloseModal}
          ></div>
          <div className="relative p-4 w-full max-w-md max-h-full z-50">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  {props.title}
                </h3>
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <AiOutlineClose />
                </button>
              </div>
              <div className="p-4 md:p-5">{props.children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
