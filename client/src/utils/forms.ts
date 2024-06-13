import { FieldErrors } from 'react-hook-form';

export const clearInputs = () => {
  [...document.querySelectorAll(`form input`)].forEach((element) => {
    element.classList.remove('border-red');
    if (element.nextElementSibling) element.nextElementSibling.innerHTML = '';
  });
};

export const handleErrors = (errors: FieldErrors<IUserInput>) => {
  clearInputs();
  for (const key in errors) {
    const brotherElement = document.querySelector(
      `form span[aria-label=${key}]`,
    ) as Element;
    brotherElement.innerHTML = errors[key].message;
  }
};
