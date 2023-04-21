const popups = document.querySelectorAll('.popup')
const editProfile = document.querySelector('.popup_editprof');
const popupAddElement = document.querySelector('.popup_elem');
const profileName = document.querySelector('#name');
const profileJob = document.querySelector('#job');
const profileFormAdd = document.querySelector('#profile');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#description');
const imgFullscreen = document.querySelector('.popup_full');
const titlePopup = imgFullscreen.querySelector('.popup__fullscreen-text');
const elements = document.querySelector('.elements');
const template = document.querySelector('#template');
const popupActiveClass = 'popup_opened';

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

function deleteBtn(evt) {
    const elem = evt.target.closest('.element');
    elem.remove();
}

function likeBtn(evt) {
    const btn = evt.target
    btn.classList.toggle('element__like_active');
}

const addElementSubmit = popupAddElement.querySelector('#newplace');
addElementSubmit.addEventListener('submit', addElementCard);

const templateElement = document.querySelector('#template').content;
const newElement = templateElement.querySelector('.element')

function createElem(data) {
    const newElement = templateElement.querySelector('.element').cloneNode(true);
    const elementImage = newElement.querySelector('#image');

    elementImage.src = data.link;
    elementImage.alt = data.name;
    newElement.querySelector('.element__text').textContent = data.name;

    addElementListeners(newElement, data);
    return newElement;
}

function setUserInfo() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    showPopup(editProfile);
}

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

popups.forEach(popup => {
    const btnClose = popup.querySelector('.popup__close-button');
    btnClose.addEventListener('click', () => hidePopup(popup))
})

function showPopup(popup) {
    popup.classList.add(popupActiveClass);
    document.addEventListener('keydown', closeByEsc);
}

function hidePopup(popup) {
    popup.classList.remove(popupActiveClass);
    document.removeEventListener('keydown', closeByEsc);
}

const buttonOpenAddCardPopup = document.querySelector('#addplace');
const buttonOpenEditProfilePopup = document.querySelector('#editprofile');
const buttonOpenImagPopup = document.querySelector('#image');

buttonOpenAddCardPopup.addEventListener('click', () => showPopup(popupAddElement));
buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        hidePopup(popupOpened);
    }
}

const elemImg = imgFullscreen.querySelector('.popup__fullscreen');

function openPopupElemShow(cardData) {
    elemImg.src = cardData.link;
    elemImg.alt = cardData.name;
    titlePopup.textContent = cardData.name;
    showPopup(imgFullscreen);
};

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
}) 

//Благодарю за подсказки, постараюсь найти время для проработки ошибок, связанных с некорректным написанием функций