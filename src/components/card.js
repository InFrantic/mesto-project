import { popupAddElement, imgFullscreen, titlePopup, elements, } from './utils.js'
import { showPopup, hidePopup } from './modal.js'

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
    const addplace = evt.target.place.value;
    const addLink = evt.target.link.value; 
    renderCard({ name: addplace, link: addLink });
    evt.target.reset();
    hidePopup(popupAddElement);
}

initialCards.map(renderCard)

function deleteBtn(evt) {
    const elem = evt.target.closest('.element');
    elem.remove();
}

function likeBtn(evt) {
    const btn = evt.target
    btn.classList.toggle('element__like_active');
}





