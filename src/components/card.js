import { popupAddElement, imgFullscreen, titlePopup, elements, setStatusButton, buttonSubmitElement, element } from './utils.js'
import { showPopup, hidePopup } from './modal.js'
import { addNewCard, deleteMyCard, addLike, removeLike } from './api.js'

const addElementSubmit = popupAddElement.querySelector('#newplace');

const templateElement = document.querySelector('#template').content;

export function createElem(data, userId, cardId, ownerId) {
    const newElement = templateElement.querySelector('.element').cloneNode(true)
    const elementImage = newElement.querySelector('#image')
    const deleteCardIcon = newElement.querySelector('#delete')
    const likeCount = newElement.querySelector('.element__likes-count')
    const likeCard = newElement.querySelector('.element__like');

    likeCount.textContent = data.likes?.length ?? "0";

    if (ownerId !== userId) {
        deleteCardIcon.remove()
    } else {
        deleteCardIcon.addEventListener("click", () => deleteBtn(deleteCardIcon, cardId))
    }

    likeCard.addEventListener("click", () => likeBtn(likeCard, cardId))
    if (data.likes && data.likes.find((like) => like._id === userId)) {
        likeCard.classList.add("element__like_active");
    }

    newElement.querySelector('#image').addEventListener("click", () => {
        openPopupElemShow(data);
    });

    newElement.querySelector('.element__text').textContent = data.name;
    elementImage.src = data.link;
    elementImage.alt = data.name;

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

addElementSubmit.addEventListener('submit', function (evt) {
    const buttonSubmitElement = document.querySelector('#createsave');
    setStatusButton({ buttonElement: buttonSubmitElement, text: 'Сохраняем...', disabled: true })
    evt.preventDefault()
    const addplace = evt.target.place.value;
    const addLink = evt.target.link.value;
    addNewCard({ name: addplace, link: addLink })
        .then((data) => {
            const ownerId = data.owner._id
            const userId = data.owner._id
            const cardId = data._id
            renderCard(data, ownerId, cardId, userId)
            evt.target.reset();
            hidePopup(popupAddElement);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setStatusButton({ buttonElement: buttonSubmitElement, text: 'Создать', disabled: false })
        })
})

function deleteBtn(element, cardId) {
    deleteMyCard(cardId)
        .then(() => {
            element.closest('.element').remove()
        })
        .catch((err) => {
            console.log(err)
        })
}

function likeBtn(element, cardId) {
    const cardLike = element.closest('.element');
    const likeCount = cardLike.querySelector('.element__likes-count');

    if (element.classList.contains("element__like_active")) {
        removeLike(cardId)
            .then((data) => {
                element.classList.remove("element__like_active")
                likeCount.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        addLike(cardId)
            .then((data) => {
                element.classList.add('element__like_active');
                likeCount.textContent = data.likes.length
            })
            .catch((err) => {
                console.log(err)
            })
    }

}
