const allPopups = document.querySelectorAll(".popup");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const nameInput = document.querySelector(".popup__name-input");
const jobInput = document.querySelector(".popup__job-input");

export function popupOverylayAndEscClose() {
  allPopups.forEach((popups) => {
    popups.addEventListener("click", (evt) => {
      closePopup(evt.target);
    });
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        closePopup(popups);
      }
    });
    document.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("body")) closePopup(popups);
    });
  });
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
} //универсальные функции открытия/закрытия попапов
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function closePopup2(button, popup) {
  button.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
  });
}
export function openPopup2(button, popup) {
  button.addEventListener("click", () => {
    popup.classList.add("popup_opened");
  });
}

export function openPopupEditProfile(button, popup) {
  button.addEventListener("click", () => {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
  });
}
