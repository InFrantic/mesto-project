<<<<<<< HEAD
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);

  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}; 

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    if (!inputElement) return;
    inputElement.classList.add(inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) return;
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement) return;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    if (!errorElement) return;
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';

}

const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
    const isFormValid = formElement && formElement.checkValidity();
    buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
    buttonElement.disabled = !isFormValid;
}

function removeButtonState(buttonElement, inactiveButtonClass) {
    toggleButtonState(false, buttonElement, inactiveButtonClass)
}

const setEventListeners = (formElement, {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('submit', e => {
        e.preventDefault();
        removeButtonState(buttonElement, inactiveButtonClass)
    });

    toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(formElement, buttonElement, inactiveButtonClass);
        });
    })
}

export const enableValidation = ({
    formSelector,
    ...rest
}) => {
    const getFormList = Array.from(document.querySelectorAll(formSelector));
    getFormList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);
    })
};

=======
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);

  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}; 

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    if (!inputElement) return;
    inputElement.classList.add(inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) return;
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement) return;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    if (!errorElement) return;
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';

}

const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
    const isFormValid = formElement && formElement.checkValidity();
    buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
    buttonElement.disabled = !isFormValid;
}

function removeButtonState(buttonElement, inactiveButtonClass) {
    toggleButtonState(false, buttonElement, inactiveButtonClass)
}

const setEventListeners = (formElement, {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('submit', e => {
        e.preventDefault();
        removeButtonState(buttonElement, inactiveButtonClass)
    });

    toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(formElement, buttonElement, inactiveButtonClass);
        });
    })
}

export const enableValidation = ({
    formSelector,
    ...rest
}) => {
    const getFormList = Array.from(document.querySelectorAll(formSelector));
    getFormList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);
    })
};

>>>>>>> 4736fe3 (meh)
