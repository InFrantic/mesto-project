//функция для UX кнопки
export function setButtonStatus({ button, disabled, text }) {
  if (disabled) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
  button.textContent = text;
}

export const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type-error",
  errorClass: "popup__input_type-error_text",
};
