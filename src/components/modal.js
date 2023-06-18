import { setStatusButton, popups, profileAvatar, avatarInput, changeAvatar, editProfile, editAvatar, popupAddElement, profileName, profileJob, profileFormAdd, nameInput, jobInput, popupActiveClass } from './utils.js'
import { editUsersMe, getUsersMe, newAvatar } from './api.js'

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
const buttonOPenEditAvatarPopup = document.querySelector('.profile__edit-avatar')

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        hidePopup(popupOpened);
    }
}

profileFormAdd.addEventListener('submit', function () {
    const buttonSubmitElement = document.querySelector('#editsave')
    setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохраняем...', disabled: true })
    editUsersMe({ name: nameInput.value, about: jobInput.value })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохранить', disabled: false })
        })
        .then((res) => {
            profileName.textContent = res.name;
            profileJob.textContent = res.about;
            hidePopup(editProfile);
        })
        .catch((err) => {
            console.log(err);
        })
});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains(popupActiveClass)) {
            hidePopup(popup);
        }
    })
});

buttonOpenAddCardPopup.addEventListener('click', () => showPopup(popupAddElement));
buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
buttonOPenEditAvatarPopup.addEventListener('click', () => showPopup(editAvatar));

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    showPopup(editProfile);
}

changeAvatar.addEventListener('submit', function () {
    const buttonSubmitElement = document.querySelector('#avatarsave')
    setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохраняем...', disabled: true })
    newAvatar({ avatar: avatarInput.value })
        .then((res) => {
            profileAvatar.src = res.avatar;
            hidePopup(editAvatar);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохранить', disabled: false })
        })
});
