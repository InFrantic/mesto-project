<<<<<<< HEAD
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





=======
import { popupAddElement, imgFullscreen, titlePopup, elements } from './utils.js'
import { showPopup, hidePopup } from './modal.js'
import { addNewCard, deleteMyCard, addLike, removeLike } from './api.js'

const addElementSubmit = popupAddElement.querySelector('#newplace');
addElementSubmit.addEventListener('submit', addElementCard);

const templateElement = document.querySelector('#template').content;

export function createElem(data, userId, cardId, ownerId) {
    const newElement = templateElement.querySelector('.element').cloneNode(true)
    const elementImage = newElement.querySelector('#image')

    const likeCount = newElement.querySelector('.element__likes-count')
    likeCount.textContent = data.likes?.length ?? "0";

    const deleteCardIcon = newElement.querySelector('#delete')
    if (ownerId !== userId) {
        deleteCardIcon.remove();
    } else {
        deleteCardIcon.addEventListener("click", () => deleteBtn(deleteCardIcon, cardId));
    }

    const likeCard = newElement.querySelector('.element__like');
    likeCard.addEventListener("click", () => likeBtn(likeCard, cardId));
    if (data.likes && data.likes.find((like) => like._id === userId)) {
        likeCard.classList.add("element__like_active");
    }

    newElement.querySelector('#image').addEventListener("click", () => {
        openPopupElemShow(data);
    });

    newElement.querySelector('.element__text').textContent = data.name;
    elementImage.src = data.link;
    elementImage.alt = data.name;

    addEventListener(newElement, data)

    return newElement;
}

const elemImg = imgFullscreen.querySelector('.popup__fullscreen');

function openPopupElemShow(data) {
    elemImg.src = data.link;
    elemImg.alt = data.name;
    titlePopup.textContent = data.name;
    showPopup(imgFullscreen);
};

export function renderCard(data, ownerId, cardId, userId) {
    elements.prepend(createElem(data, ownerId, cardId, userId))
}

function addElementCard(evt) {
    evt.preventDefault()
    const addplace = evt.target.place.value;
    const addLink = evt.target.link.value;
    return addNewCard({ name: addplace, link: addLink })
        .then(data => {
            renderCard({ name: addplace, link: addLink }, elements, data)
            evt.target.reset();
            hidePopup(popupAddElement);
        })
}

function deleteBtn(btn, cardId) {
    deleteMyCard(cardId)
        .then(() => {
            btn.closest('.element').remove()
        })
        .catch((err) => {
            console.log(err)
        })
}

function likeBtn(btn, cardId) {
    const likeCount = elements.querySelector('.element__likes-count');

    if (btn.classList.contains("element__like_active")) {
        removeLike(cardId)
            .then((data) => {
                btn.classList.remove("element__like_active")
                likeCount.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        addLike(cardId)
            .then((data) => {
                btn.classList.add('element__like_active');
                likeCount.textContent = data.likes.length
            })
            .catch((err) => {
                console.log(err)
            })
    }

}
>>>>>>> 4736fe3 (meh)
