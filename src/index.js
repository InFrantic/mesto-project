//импорты
import "./pages/index.css";
import {
  createCard,
  placesContainer,
  deleteElement,
  statusLikeUpdate,
} from "./components/cards.js";
import { enableValidation } from "./components/validate.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  editUserProfile,
  addCard,
  changeAvatar,
  getAllData,
  deleteCard,
  changelikeStatus,
} from "./components/api.js";
import { setButtonStatus } from "./components/utilits.js";
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
const popups = document.querySelectorAll(".popup");
const popupSubmit = document.querySelector(".popup__submit");
const popupAvatar = document.querySelector(".popup_avatar");
const avatarButton = document.querySelector(".profile__avatar-button");
const avatarInput = document.querySelector(".popup_avatar__input");
const profilePhoto = document.querySelector(".profile__avatar");
const avatarForm = document.forms["avatar"];

//общая функция для попапов для закрытия через ESC и Крестик
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

//открытие попапа замены аватара
avatarButton.addEventListener("click", () => {
  openPopup(popupAvatar);
});

//открытие попапа Редактировать профиль
buttonOpenEditProfileForm.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  popupSubmit.disabled = false;
  popupSubmit.classList.remove("popup__submit_inactive");
});

//открытие попапа новое место
buttonOpenAddCardForm.addEventListener("click", () => {
  openPopup(popupCards);
});

//получение данных профиля и карточек с сервера
let userId = null;
getAllData()
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileStatus.textContent = user.about;
    profilePhoto.src = user.avatar;
    userId = user._id;
    cards.reverse().forEach((card) => {
      createCard(card, placesContainer, userId);
    });
  })
  .catch((error) => {
    console.log(`Упс, Ошибка - ${error}`);
  });

//функция удаление карточки с сервера
export function HendleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      deleteElement(cardElement);
    })
    .catch((error) => {
      console.log(`Упс, Ошибка - ${error}`);
    });
}

//функция лайка на сервере
export function handleLikeStatus(likeId, isLiked, cardElement) {
  changelikeStatus(likeId, isLiked)
    .then((data) => {
      statusLikeUpdate(cardElement, data.likes, userId);
    })
    .catch((error) => {
      console.log(`Упс, Ошибка -${error}`);
    });
}

//функция самбита профиля
function submitEditProfileForm(evt) {
  setButtonStatus({
    button: popupSubmit,
    disabled: true,
    text: "Сохраняем...",
  });
  evt.preventDefault();
  editUserProfile(nameInput, jobInput)
    .then((data) => {
      profileName.textContent = data.name;
      profileStatus.textContent = data.about;
      closePopup(popupEditProfile);
      popupSubmit.disabled = true;
    })
    .catch((error) => {
      console.log(`Упс, Ошибка - ${error}`);
    })
    .finally(() => {
      setButtonStatus({
        button: popupSubmit,
        disabled: false,
        text: "Сохранить",
      });
    });
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

//функция самбита новой карточки
function submitFormAddCard(evt) {
  setButtonStatus({
    button: popupSubmit,
    disabled: true,
    text: "Сохраняем...",
  });
  evt.preventDefault();
  addCard({ name: nameCardInput.value, link: urlCardInput.value })
    .then((dataCard) => {
      createCard(dataCard, placesContainer, userId);
      closePopup(popupCards);
      formAddCard.reset();
    })
    .catch((error) => {
      console.log(`Упс, Ошибка - ${error}`);
    })
    .finally(() => {
      setButtonStatus({
        button: popupSubmit,
        disabled: false,
        text: "Сохранить",
      });
    });
}
formAddCard.addEventListener("submit", submitFormAddCard);

//функция самбита аватара

function submitAvatar(evt) {
  setButtonStatus({
    button: popupSubmit,
    disabled: true,
    text: "Сохраняем...",
  });
  evt.preventDefault();
  changeAvatar(avatarInput)
    .then((data) => {
      profilePhoto.src = data.avatar;
      closePopup(popupAvatar);
      avatarForm.reset();
    })
    .catch((error) => {
      console.log(`Упс, Ошибка -${error}`);
    })
    .finally(() => {
      setButtonStatus({
        button: popupSubmit,
        disabled: false,
        text: "Сохранить",
      });
    });
}

avatarForm.addEventListener("submit", submitAvatar);

//валидация
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type-error",
  errorClass: "popup__input_type-error_text",
});
