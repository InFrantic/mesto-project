import '../pages/index.css';
import { enableValidation } from './validate.js';
import { profileName, profileJob, elements, profileAvatar } from './utils.js'
import { createElem } from './card.js'
import { getUsersMe, getInitialCards } from './api.js'

enableValidation({
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
});

Promise.all([getUsersMe(), getInitialCards()])
    .then(([res, dataCard]) => {
        profileName.textContent = res.name;
        profileJob.textContent = res.about;
        profileAvatar.src = res.avatar
        const userId = res._id
        dataCard.forEach(data => {
            const ownerId = data.owner._id
            const cardId = data._id
            const elemCard = createElem(data, userId, cardId, ownerId)
            elements.append(elemCard);
        })
    })
    .catch((err) => {
        console.log(err)
    })
