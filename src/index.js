//импорты
import "./pages/index.css";
import {
  initialCards,
  renderInitialCards,
  createCard,
} from "./components/cards.js";
import { enableValidation } from "./components/validate.js";
import {
  openPopup,
  closePopup,
  popupOverylayAndEscClose,
} from "./components/modal.js";

//объявление переменных
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const popupEditProfile = document.querySelector(".popup_edit-profile");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
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
nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;

//открытие попапа Редактировать профиль
buttonOpenEditProfileForm.addEventListener("click", () => {
  openPopup(popupEditProfile);
});
//закрытие попапа Редактировать профиль
buttonCloseEditProfileForm.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
//открытие попапа новое место
buttonOpenAddCardForm.addEventListener("click", () => {
  openPopup(popupCards);
});
//закрытие попапа новое место
popupCardsCloseButton.addEventListener("click", () => {
  closePopup(popupCards);
});
//фукнция закрытия попапов через оверлей и ESC
popupOverylayAndEscClose();

//функция самбита профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}
formEditProfile.addEventListener("submit", submitEditProfileForm);

//функция самбита новой карточки
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

//функция добавление новых карточек из массива
renderInitialCards(initialCards);

//валидация
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type-error",
  errorClass: "popup__input_type-error_text",
});
