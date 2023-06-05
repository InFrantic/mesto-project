
export function openPopup(popup) {
  document.addEventListener("click", (evt) => {
    evt.target.classList.remove("popup_opened");
  });

  popup.classList.add("popup_opened");
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_opened");
    }
  });
}
//универсальные функции открытия/закрытия попапов
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
