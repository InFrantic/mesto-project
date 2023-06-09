export const popups = document.querySelectorAll('.popup')
export const editProfile = document.querySelector('.popup_editprof');
export const popupAddElement = document.querySelector('.popup_elem');
export const profileName = document.querySelector('#name');
export const profileJob = document.querySelector('#job');
export const profileFormAdd = document.querySelector('#profile');
export const nameInput = document.querySelector('#username');
export const jobInput = document.querySelector('#description');
export const imgFullscreen = document.querySelector('.popup_full');
export const titlePopup = imgFullscreen.querySelector('.popup__fullscreen-text');
export const elements = document.querySelector('.elements');
export const element = elements.querySelector('.element');
export const template = document.querySelector('#template');
export const popupActiveClass = 'popup_opened';
export const templateElement = document.querySelector('#template').content;
export const newElement = templateElement.querySelector('.element').cloneNode(true);
export const elementImage = newElement.querySelector('#image');
export const likeCount = newElement.querySelector('.element__likes-count');
export const deleteBtn = newElement.querySelector('#delete');
export const editAvatar = document.querySelector('.popup_avatar');
export const changeAvatar = document.querySelector('#avatar');
export const avatarInput = document.querySelector('#inputavatar');
export const profileAvatar = document.querySelector('.profile__avatar');

export function setStatusButton({ buttonElement, text, disabled }) {
    if (disabled) {
        buttonElement.disabled = 'disabled';
    } else {
        buttonElement.disabled = false;
    }

    buttonElement.textContent = text;
}
