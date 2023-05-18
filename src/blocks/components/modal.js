import { popups, editProfile, popupAddElement, profileName, profileJob, profileFormAdd, nameInput, jobInput, imgFullscreen, titlePopup, elements, template, popupActiveClass } from './utils.js'
import { initialCards } from './card.js';

popups.forEach(popup => {
    const btnClose = popup.querySelector('.popup__close-button');
    btnClose.addEventListener('click', () => hidePopup(popup));
})

function showPopup(popup) {
    popup.classList.add(popupActiveClass);
    document.addEventListener('keydown', closeByEsc);
}

function hidePopup(popup) {
    popup.classList.remove(popupActiveClass);
    document.removeEventListener('keydown', closeByEsc);
}

export const buttonOpenAddCardPopup = document.querySelector('#addplace');
export const buttonOpenEditProfilePopup = document.querySelector('#editprofile');


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

function addElementListeners(element, cardData) {
    element.querySelector('.element__like').addEventListener('click', likeBtn);
    element.querySelector('#delete').addEventListener('click', deleteBtn);
    element.querySelector('#image').addEventListener("click", () => {
        openPopupElemShow(cardData);
    });
}

const addElementSubmit = popupAddElement.querySelector('#newplace');
addElementSubmit.addEventListener('submit', addElementCard);

const templateElement = document.querySelector('#template').content;

function createElem(data) {
    const newElement = templateElement.querySelector('.element').cloneNode(true);
    const elementImage = newElement.querySelector('#image');

    elementImage.src = data.link;
    elementImage.alt = data.name;
    newElement.querySelector('.element__text').textContent = data.name;

    addElementListeners(newElement, data);
    return newElement;
}

const elemImg = imgFullscreen.querySelector('.popup__fullscreen');

function openPopupElemShow(cardData) {
    elemImg.src = cardData.link;
    elemImg.alt = cardData.name;
    titlePopup.textContent = cardData.name;
    showPopup(imgFullscreen);
};

function renderCard(data) {
    const elemClone = createElem(data)
    elements.prepend(elemClone);
}

function addElementCard(evt) {
    evt.preventDefault();
    const addplace = evt.target.querySelector('#place').value;
    const addLink = evt.target.querySelector('#link').value;
    renderCard({ name: addplace, link: addLink });
    evt.target.reset();
    hidePopup(popupAddElement);
}

initialCards.map(renderCard)

buttonOpenAddCardPopup.addEventListener('click', () => showPopup(popupAddElement));
buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    showPopup(editProfile);
}

export function deleteBtn(evt) {
    const elem = evt.target.closest('.element');
    elem.remove();
}

export function likeBtn(evt) {
    const btn = evt.target
    btn.classList.toggle('element__like_active');
}