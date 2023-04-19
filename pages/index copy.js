document.querySelector('#editprofile').addEventListener('click', function (e) {
    let editprof = document.querySelector('.popup');
    editprof.classList.add('popup_opened');
});

document.querySelector('#editclose').addEventListener('click', function (e) {
    let editprof = document.querySelector('.popup');
    editprof.classList.remove('popup_opened');
});

document.querySelector('.popup__save').addEventListener('click', function (e) {
    let editprof = document.querySelector('.popup');
    editprof.classList.remove('popup_opened');
});

const formElement = document.querySelector('#profile');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#description');

function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = document.querySelector('#username').value;
    let jobInput = document.querySelector('#description').value;

    let name = document.querySelector('#name');
    let job = document.querySelector('#job');

    name.textContent = nameInput;
    job.textContent = jobInput;
};
formElement.addEventListener('submit', handleFormSubmit);

document.querySelector('#addplace').addEventListener('click', function (e) {
    let newplace = document.querySelector('.popup_elem');
    newplace.classList.add('popup_opened');
});

document.querySelector('#addclose').addEventListener('click', function (e) {
    let newplace = document.querySelector('.popup_elem');
    newplace.classList.remove('popup_opened');
});

const elements = document.querySelector('.elements');
const addButton = document.querySelector('#create');

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

initialCards.forEach(function (element) {
    const initialCardsTemplate = document.querySelector('#template').content;
    const initialCardsElement = initialCardsTemplate.querySelector('.element').cloneNode(true);

    initialCardsElement.querySelector('.element__text').textContent = element.name;
    initialCardsElement.querySelector('.element__image').src = element.link;

    elements.append(initialCardsElement)
});

function addPlace(placeValue, linkValue) {

    const placeTemplate = document.querySelector('#template').content;
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

    placeElement.querySelector('.element__text').textContent = placeValue;
    placeElement.querySelector('.element__image').src = linkValue;

    placeElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    elements.prepend(placeElement);
};

addButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    const place = document.querySelector('#place');
    const link = document.querySelector('#link');

    let newplace = document.querySelector('.popup_elem');
    newplace.classList.remove('popup_opened');

    addPlace(place.value, link.value);

    place.value = '';
    link.value = '';

    const deleteButton = document.querySelector('#delete');
    document.querySelector('#delete').addEventListener('click', function () {

        const element = deleteButton.closest('.element');
        element.remove();
    });
});

document.querySelectorAll('#delete').forEach(btn => btn.addEventListener('click', function (evt) {
    const deleteButton = document.querySelector('#delete');
    const element = deleteButton.closest('.element');
    element.remove() = evt.target;
}));

document.querySelectorAll('.element__like').forEach(btn => btn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
}));

function fullscreen(img, text) {
    const image = document.querySelector('.popup_full');
    image.querySelector('.popup__fullscreen').src = img;
    image.querySelector('.popup__fullscreen-text').textContent = text;
};

document.querySelectorAll('#image').forEach(Image => Image.addEventListener('click', function () {
    const imagefull = document.querySelector('.popup_full');
    imagefull.classList.add('popup_opened');
  
    const img = document.querySelector('#image');
    const text = document.querySelector('.element__text');

    fullscreen(img.src, text.value);

    img.value = '';
    text.value = '';
}));

document.querySelector('#fullclose').addEventListener('click', function () {
    const imagefull = document.querySelector('.popup_full');
    imagefull.classList.remove('popup_opened');
});