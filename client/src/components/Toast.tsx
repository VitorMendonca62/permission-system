interface IPropsToastSucess {
  msg: string;
  visibleMessage: boolean;
  setVisibleMessage: (visibleMessage: boolean) => void;
}

export default function Toast(props: IPropsToastSucess) {
  return (
    <div
      id="toast-success"
      className={`absolute z-[60] top-3 right-3 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow  ${
        !props.visibleMessage
          ? 'transition-opacity duration-500 ease-out opacity-0 translate-x-[100%]'
          : 'opacity-100 '
      }`}
      role="alert"
    >
      <div className="ms-3 text-sm font-normal">{props.msg}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={() => props.setVisibleMessage(false)}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
