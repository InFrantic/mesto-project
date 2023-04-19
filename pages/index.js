const popup = document.querySelectorAll('.popup')
const EditProfile = document.querySelector('.popup_editprof');
const popupAdd = document.querySelector('.popup_elem');
const profileName = document.querySelector('#name');
const profileJob = document.querySelector('#job');
const profileForm = document.querySelector('#profile');
const NameInput = document.querySelector('#username');
const JobInput = document.querySelector('#description');
const imgFull = document.querySelector('.popup_full');
const titlePopup = imgFull.querySelector('.popup__fullscreen-text');
const Elements = document.querySelector('.elements');
const Template = document.querySelector('#template');
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

function deleteBtn(evt) {
    const elem = evt.target.closest('.element');
    elem.remove();
}

function LikeBtn(evt) {
    const btn = evt.target
    btn.classList.toggle('element__like_active');
}

const AddElem = popupAdd.querySelector('#newplace');
const TemplateElem = document.querySelector('#template').content;

function createElem(data) {
    const newElem = TemplateElem.querySelector('.element').cloneNode(true);
    const elementImage = newElem.querySelector('#image');

    elementImage.src = data.link;

    newElem.querySelector('.element__text').textContent = data.name;

    ElementAddListeners(newElem, data);
    return newElem;
}

function Profile() {
    profileName.textContent = NameInput.value;
    profileJob.textContent = JobInput.value;
}

function ProfileInputs() {
    NameInput.value = profileName.textContent;
    JobInput.value = profileJob.textContent;
    showPopup(EditProfile);
}

function addTemplate(data) {
    const elemClone = createElem(data)
    Elements.prepend(elemClone);
}

function ElementAdd(evt) {
    evt.preventDefault();
    const elemName = evt.target.querySelector('#place').value;
    const elemLink = evt.target.querySelector('#link').value;
    addTemplate({ name: elemName, link: elemLink });
    evt.target.reset();
    hidePopup(popupAdd);
}
AddElem.addEventListener('submit', ElementAdd);

initialCards.map(addTemplate);

popup.forEach(popup => {
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

const addButton = document.querySelector('#addplace');
const editButton = document.querySelector('#editprofile');
const imgButton = document.querySelector('#image');

addButton.addEventListener('click', () => showPopup(popupAdd));
editButton.addEventListener('click', ProfileInputs);

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        hidePopup(popupOpened);
    }
}

const elemImg = imgFull.querySelector('.popup__fullscreen');

function openPopupElemShow(elementdata) {
    elemImg.src = elementdata.link;
    titlePopup.textContent = elementdata.name;
    showPopup(imgFull);
};

function ElementAddListeners(element, elementdata) {
    element.querySelector('.element__like').addEventListener('click', LikeBtn);
    element.querySelector('#delete').addEventListener('click', deleteBtn);
    element.querySelector('#image').addEventListener("click", () => {
        openPopupElemShow(elementdata);
    });
}

profileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    Profile();
    hidePopup(EditProfile);
});

popup.forEach((popup) => { 
    popup.addEventListener('click', (evt) => { 
      if (evt.target.classList.contains(popupActiveClass)) {
          hidePopup(popup); 
      } 
    })
  }) 