<<<<<<< HEAD
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

=======
import { buttonSubmitElement, popups, profileAvatar, avatarInput, changeAvatar, editProfile, editAvatar, popupAddElement, profileName, profileJob, profileFormAdd, nameInput, jobInput, popupActiveClass } from './utils.js'
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
    setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохраняем...', disabled: true })
    editUsersMe({ name: nameInput.value, about: jobInput.value })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохранить', disabled: false })
        })
        .then(() => {
            getUsersMe()
                .then((res) => {
                    profileName.textContent = res.name;
                    profileJob.textContent = res.about;
                    hidePopup(editProfile);
                })
                .catch((err) => {
                    console.log(err);
                })
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

function setStatusButton({ buttonElement, text, disabled }) {
    if (disabled) {
        buttonElement.disabled = 'disabled';
    } else {
        buttonElement.disabled = false;
    }

    buttonElement.textContent = text;
}

changeAvatar.addEventListener('submit', function () {
    setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохраняем...', disabled: true })
    newAvatar({ avatar: avatarInput.value })
        .then(() => {
            getUsersMe()
                .then((res) => {
                    profileAvatar.src = res.avatar;
                    hidePopup(editAvatar);
                })
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохранить', disabled: false })
        })
});
>>>>>>> 4736fe3 (meh)
