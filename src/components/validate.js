function showInputError(formElement, inputElement, errorMessage) {
  const popupError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type-error");
  popupError.classList.add("popup__input_type-error_text");
  popupError.textContent = errorMessage;
}

function hidenIputError(formElement, inputElement) {
  const popupError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type-error");
  popupError.classList.remove("popup__input_type-error_text");
  popupError.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hidenIputError(formElement, inputElement);
  }
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".popup__submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}
enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__submit_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__submit_inactive");
  }
}
export { enableValidation };
