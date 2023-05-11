const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit-profile');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close');
const popupCards = document.querySelector('.popup_cards');
const popupCardsCloseButton = document.querySelector('.popup-cards__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const CardAddForm = document.querySelector('.popup-cards__form');
const nameCardInput = document.querySelector('.popup-cards__name-input');
const urlCardInput = document.querySelector('.popup-cards__url-input');
const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#element-template").content;
const popupPhotoScale = document.querySelector('.popup-img');
const popupImgPhoto = document.querySelector('.popup-img__photo');
const popupImgText = document.querySelector('.popup-img__text');
const popupImgCloseButton = document.querySelector('.popup-img__close')



function openPopup(popup){
  popup.classList.add('popup_opened')
}                                        //универсальные функции открытия/закрытия попапов
function closePopup(popup){
  popup.classList.remove('popup_opened')
}
//Функция открытия попапа "Редактировать Профиль"

profileEditButton.addEventListener('click', () =>{
  openPopup(popupEdit)
})

//Функция закрытия попапа "Редактировать Профиль"
/popupCloseButton.addEventListener("click",() =>{ 
  closePopup(popupEdit)
})
  

//Функция открытия попапа "Добавление карточки"
profileAddButton.addEventListener('click', () => {
  openPopup(popupCards)
});

//Функция закрытия попапа "Добавление карточки"    
popupCardsCloseButton.addEventListener("click", () => {
  closePopup(popupCards)
});

//функция закрытия попапа "Увиличение карточки"
popupImgCloseButton.addEventListener('click',() => {
  closePopup(popupPhotoScale)
})

//функция Редактирование профиля
nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupEdit)

}
formElement.addEventListener('submit', formSubmitHandler);

//функция добавления карточки
  function addCard(item){
    item.forEach(({name, link}) => {
      createCard(name, link)
    })
  }

//функция создания карточки
  function createCard(name, link){
    const placeElement = getCard(name,link);
    placesContainer.prepend(placeElement);
  }

//функция получения карточки
  function getCard(name, link) {
    const placeElement = placeTemplate.cloneNode(true);
    const elementImg = placeElement.querySelector('.element__photo');
   const elementTitle = placeElement.querySelector('.element__title')
   const elementTrash = placeElement.querySelector('.element__delete');
   const elementLike = placeElement.querySelector('.element__like');

  elementTitle.textContent = name;
  elementImg.src = link;
  elementImg.alt = `${name}.`;
  
elementTrash.addEventListener('click', () => deleteElement(elementTrash));
elementLike.addEventListener('click',() => likeElement(elementLike));
elementImg.addEventListener('click', () => showPopupPhotoScale(elementImg, name));

return placeElement
  }
  addCard(initialCards);

//функция сохранения формы добавления карточек
  function submitFormAddCard(evt) {
    evt.preventDefault();
    const name = nameCardInput.value;
    const link = urlCardInput.value;
    evt.preventDefault();
    createCard(name, link);
    closePopup(popupCards);
    CardAddForm.reset()
  }
CardAddForm.addEventListener('submit',submitFormAddCard);

//функция удаления карточки
function deleteElement(dbutton) {
  dbutton.closest('.element').remove();
}

//функция лайка карточки
function likeElement(like) {
  like.classList.toggle('element__like_active');
}

//функция открытия попапа "Увиличение картинки"
function showPopupPhotoScale(img, title) {
  openPopup(popupPhotoScale);

  popupImgPhoto.src = img.src;
  popupImgPhoto.alt = `${title}.`;
  popupImgText.textContent = title;
}

const dasdsa= document.querySelector('.jop  ')