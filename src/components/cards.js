//импорты
import { openPopup } from "./modal.js";
import { HendleDeleteCard, handleLikeStatus } from "../index.js";

//объявление переменных
const popupPhotoScale = document.querySelector(".popup-img");
const popupImgPhoto = document.querySelector(".popup-img__photo");
const popupImgText = document.querySelector(".popup-img__text");
export const placesContainer = document.querySelector(".elements");

//функция проверки постановки лайка
function isLiked(likes, userId) {
  return likes.find((like) => {
    return like._id === userId;
  });
}

//функция обновлениея статуса лайка
export function statusLikeUpdate(cardElement, likes, userId) {
  const elementLike = cardElement.querySelector(".element__like");
  const likeEnumerator = cardElement.querySelector(".element__like_enumerator");
  likeEnumerator.textContent = likes.length;
  if (isLiked(likes, userId)) {
    elementLike.classList.add("element__like_active");
  } else {
    elementLike.classList.remove("element__like_active");
  }
}

//функция создания карточки
export function createCard(data, container, userId) {
  const placeElement = getCard(
    data,
    userId,
    HendleDeleteCard,
    handleLikeStatus
  );
  container.prepend(placeElement);
}
//функция открытия попапа "Увиличение картинки"
export function showPopupPhotoScale(img, title) {
  openPopup(popupPhotoScale);
  popupImgPhoto.src = img.src;
  popupImgPhoto.alt = `${title}.`;
  popupImgText.textContent = title;
}
//функция получения карточки
export function getCard(data, userId, HendleDeleteCard, handleLikeStatus) {
  const placeTemplate = document.querySelector("#element-template").content;
  const placeElement = placeTemplate.cloneNode(true);
  const elementImg = placeElement.querySelector(".element__photo");
  const elementTitle = placeElement.querySelector(".element__title");
  const elementTrash = placeElement.querySelector(".element__delete");
  const elementLike = placeElement.querySelector(".element__like");
  const cardElement = placeElement.querySelector(".element");
  elementTitle.textContent = data.name;
  elementImg.src = data.link;
  elementImg.alt = data.name;
  statusLikeUpdate(cardElement, data.likes, userId);
  elementTrash.addEventListener("click", () =>
    HendleDeleteCard(data._id, cardElement)
  );
  elementLike.addEventListener("click", () =>
    handleLikeStatus(
      data._id,
      elementLike.classList.contains("element__like_active"),
      cardElement
    )
  );
  elementImg.addEventListener("click", () =>
    showPopupPhotoScale(elementImg, data.name)
  );
  if (data.owner._id !== userId) {
    elementTrash.remove();
  }
  return placeElement;
}

//функция удаления карточки
export function deleteElement(element) {
  element.remove();
}

//функция лайка карточки
export function likeElement(like) {
  like.classList.toggle("element__like_active");
}
