import { closePopup, openPopup } from "./modal.js";
const popupPhotoScale = document.querySelector(".popup-img");
const popupImgPhoto = document.querySelector(".popup-img__photo");
const popupImgText = document.querySelector(".popup-img__text");
const popupImgCloseButton = document.querySelector(".popup-img__close");
const placesContainer = document.querySelector(".elements");
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//функция рендера карточки
export function renderInitialCards(item) {
  item.forEach(({ name, link }) => {
    createCard(name, link);
  });
}

//функция создания карточки
export function createCard(name, link) {
  const placeElement = getCard(name, link);
  placesContainer.prepend(placeElement);
}
//функция открытия попапа "Увиличение картинки"
export function showPopupPhotoScale(img, title) {
  openPopup(popupPhotoScale);
  popupImgPhoto.src = img.src;
  popupImgPhoto.alt = `${title}.`;
  popupImgText.textContent = title;
}
//функция получения карточки
export function getCard(name, link) {
  const placeTemplate = document.querySelector("#element-template").content;
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

//функция удаления карточки
export function deleteElement(dbutton) {
  dbutton.closest(".element").remove();
}

//функция лайка карточки
export function likeElement(like) {
  like.classList.toggle("element__like_active");
}
