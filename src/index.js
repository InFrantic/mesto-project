//импорты
import "./pages/index.css";
import {
  initialCards,
  renderInitialCards,
  createCard,
} from "./components/cards.js";
import { enableValidation } from "./components/validate.js";
import { openPopup, closePopup } from "./components/modal.js";

//объявление переменных
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const popupEditProfile = document.querySelector(".popup_edit-profile");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const popupCards = document.querySelector(".popup_cards");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const formEditProfile = document.forms["profile-form"];
const nameInput = document.querySelector(".popup__name-input");
const jobInput = document.querySelector(".popup__job-input");
const formAddCard = document.forms["card-form"];
const nameCardInput = document.querySelector(".popup-cards__name-input");
const urlCardInput = document.querySelector(".popup-cards__url-input");
const buttonSubmitCards = document.querySelector(".popup-cards__submit");
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//открытие попапа Редактировать профиль
buttonOpenEditProfileForm.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});

//открытие попапа новое место
buttonOpenAddCardForm.addEventListener("click", () => {
  openPopup(popupCards);
});

//функция самбита профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupEditProfile);
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
