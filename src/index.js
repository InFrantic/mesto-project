import './pages/index.css';
import { enableValidation } from './components/validate.js';
import './components/utils.js'
import './components/modal.js'
import './components/card.js'

enableValidation({
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
});
