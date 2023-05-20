import { popups, editProfile, popupAddElement, profileName, profileJob, profileFormAdd, nameInput, jobInput, popupActiveClass } from './utils.js'

popups.forEach(popup => {
    const btnClose = popup.querySelector('.popup__close-button');
    btnClose.addEventListener('click', () => hidePopup(popup));
})

export function showPopup(popup) {
    popup.classList.add(popupActiveClass);
    document.addEventListener('keydown', closeByEsc);
}

export function hidePopup(popup) {
    popup.classList.remove(popupActiveClass);
    document.removeEventListener('keydown', closeByEsc);
}

const buttonOpenAddCardPopup = document.querySelector('#addplace');
const buttonOpenEditProfilePopup = document.querySelector('#editprofile');


function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        hidePopup(popupOpened);
    }
}

profileFormAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    setUserInfo();
    hidePopup(editProfile);
});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains(popupActiveClass)) {
            hidePopup(popup);
        }
    })
});

function setUserInfo() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

buttonOpenAddCardPopup.addEventListener('click', () => showPopup(popupAddElement));
buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    showPopup(editProfile);
}

