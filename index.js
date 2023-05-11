const buttonOpenEditProfileForm = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const  buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const buttonCloseEditProfileForm = document.querySelector(".popup__close");
const popupCards = document.querySelector(".popup_cards");
const popupCardsCloseButton = document.querySelector(".popup-cards__close");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const formEditProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__name-input");
const jobInput = document.querySelector(".popup__job-input");
const formAddCard = document.querySelector(".popup-cards__form");
const nameCardInput = document.querySelector(".popup-cards__name-input");
const urlCardInput = document.querySelector(".popup-cards__url-input");
const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#element-template").content;
const popupPhotoScale = document.querySelector(".popup-img");
const popupImgPhoto = document.querySelector(".popup-img__photo");
const popupImgText = document.querySelector(".popup-img__text");
const popupImgCloseButton = document.querySelector(".popup-img__close");

function openPopup(popup) {
  popup.classList.add("popup_opened");
} //универсальные функции открытия/закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
//Функция открытия попапа "Редактировать Профиль"

buttonOpenEditProfileForm.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;
}) /
  //Функция закрытия попапа "Редактировать Профиль"
  buttonCloseEditProfileForm.addEventListener("click", () => {
    closePopup(popupEditProfile);
  });

//Функция открытия попапа "Добавление карточки"
buttonOpenAddCardForm.addEventListener("click", () => {
  openPopup(popupCards);
});

//Функция закрытия попапа "Добавление карточки"
popupCardsCloseButton.addEventListener("click", () => {
  closePopup(popupCards);
});

//функция закрытия попапа "Увиличение карточки"
popupImgCloseButton.addEventListener("click", () => {
  closePopup(popupPhotoScale);
});

//функция Редактирование профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupEditProfile);
  nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;
}
formEditProfile.addEventListener("submit", submitEditProfileForm);

//функция рендера карточки
function renderInitialCards(item) {
  item.forEach(({ name, link }) => {
    createCard(name, link);
  });
}

//функция создания карточки
function createCard(name, link) {
  const placeElement = getCard(name, link);
  placesContainer.prepend(placeElement);
}

//функция получения карточки
function getCard(name, link) {
  const placeElement = placeTemplate.cloneNode(true);
  const elementImg = placeElement.querySelector(".element__photo");
  const elementTitle = placeElement.querySelector(".element__title");
  const elementTrash = placeElement.querySelector(".element__delete");
  const elementLike = placeElement.querySelector(".element__like");

  elementTitle.textContent = name;
  elementImg.src = link;
  elementImg.alt = `${name}.`;

  elementTrash.addEventListener("click", () => deleteElement(elementTrash));
  elementLike.addEventListener("click", () => likeElement(elementLike));
  elementImg.addEventListener("click", () =>
    showPopupPhotoScale(elementImg, name)
  );

  return placeElement;
}
renderInitialCards(initialCards);

//функция сохранения формы добавления карточек
function submitFormAddCard(evt) {
  evt.preventDefault();
  const name = nameCardInput.value;
  const link = urlCardInput.value;
  evt.preventDefault();
  createCard(name, link);
  closePopup(popupCards);
  formAddCard.reset();
}
formAddCard.addEventListener("submit", submitFormAddCard);

//функция удаления карточки
function deleteElement(dbutton) {
  dbutton.closest(".element").remove();
}

//функция лайка карточки
function likeElement(like) {
  like.classList.toggle("element__like_active");
}

//функция открытия попапа "Увиличение картинки"
function showPopupPhotoScale(img, title) {
  openPopup(popupPhotoScale);

  popupImgPhoto.src = img.src;
  popupImgPhoto.alt = `${title}.`;
  popupImgText.textContent = title;
}
