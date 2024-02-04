allPopup.forEach(popup, () => {
    popup.addEventListener("click", (evt) => {
    closePopup(evt.target);
    });
    });
    
    document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
    closePopup(popup);
    }
    });

    