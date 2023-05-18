import './pages/index.css';
import { enableValidation } from './blocks/components/validate.js';
import './blocks/components/utils.js'
import './blocks/components/modal.js'

enableValidation({
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
});
