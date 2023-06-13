//функция для UX кнопки
export function setButtonStatus({ button, disabled, text }) {
  if (disabled) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
  button.textContent = text;
}
