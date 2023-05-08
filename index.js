document.querySelector('.profile__edit-button').addEventListener("click", function(){
    document.querySelector('.popup').classList.add('popup_opened')
});
document.querySelector('.popup__close').addEventListener("click", function(){
    document.querySelector('.popup').classList.remove('popup_opened')
});


document.querySelector('.profile__add-button').addEventListener('click', function(){
    document.querySelector('.popup-cards').classList.add('popup-cards_opened')
});
    
document.querySelector('.popup-cards__close').addEventListener("click", function(){
    document.querySelector('.popup-cards').classList.remove('popup-cards_opened')
});




    const formElement = document.querySelector('.popup__form');
    const nameInput = document.querySelector('.popup__name-input');
    const jobInput = document.querySelector('.popup__job-input');
    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value  = document.querySelector('.profile__status').textContent;



function formSubmitHandler (evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__status').textContent = jobInput.value;
    document.querySelector('.popup').classList.remove('popup_opened');
    
}


formElement.addEventListener('submit', formSubmitHandler);
          

const formElementCard = document.querySelector('.popup-cards__form');
const nameInputCard = document.querySelector('.popup-cards__name-input');
const urlInput = document.querySelector('.popup-cards__url-input');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];
 
  const placesContainer = document.querySelector(".elements");
  const placeTemplate = document.querySelector("#element-template").content;
  const placeInfo = initialCards.map(function (item) {
    return {
      name: item.name,
      link: item.link
    };
  });
  
  function create() {
    placeInfo.forEach(createCard);
  }
  
  function createCard({ name, link }) {
    const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
    placeElement.querySelector(".element__title").textContent = name;
    placeElement.querySelector(".element__photo").src = link;
    placeElement.querySelector('.element__photo').alt = name;
  
    placesContainer.prepend(placeElement);
  }
  
  create();
  

const CardAddForm = document.querySelector('.popup-cards__form');
const nameCardInput = document.querySelector('.popup-cards__name-input');
const urlCardInput = document.querySelector('.popup-cards__url-input');

function cardAddSubmit(evt){
evt.preventDefault();
const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
placeElement.querySelector(".element__title").textContent = nameCardInput.value;
placeElement.querySelector(".element__photo").src = urlCardInput.value;

placesContainer.prepend(placeElement);
document.querySelector('.popup-cards').classList.remove('popup-cards_opened')

document.querySelector('.element__like').addEventListener('click', function(evt){
  evt.target.classList.toggle('element__like_active');
})
  document.querySelector('.element__delete').addEventListener('click', function(){
    document.querySelector('.element__delete').closest('.element').remove()
})
document.querySelector('.element__photo').addEventListener('click',function(){
  popup.classList.toggle('popup_opened')
  popupPhoto.src = document.querySelector('.element__photo').src
  popupText.textContent = nameCardInput.value 
 
})

};

CardAddForm.addEventListener('submit', cardAddSubmit);



const like = placesContainer.querySelectorAll('.element__like')

like.forEach(function (button){
button.addEventListener('click', function (evt){
  evt.target.classList.toggle('element__like_active')
})
});


const trash = placesContainer.querySelectorAll('.element__delete')

trash.forEach(function (dbutton){
dbutton.addEventListener('click', function(){
dbutton.closest('.element').remove();

})
});






const popupPhoto = document.querySelector('.popup-img__photo');
const elementPhoto = document.querySelectorAll('.element__photo');
const popupText = document.querySelector('.popup-img__text');
const elementTitle = document.querySelectorAll('.element__title');




const popup = document.querySelector('.popup-img')
     


document.querySelector('.popup-img__close').addEventListener('click',function(){
  popup.classList.remove('popup_opened')
})
 
  
elementPhoto.forEach(function(pht) {
  pht.addEventListener('click', function(evt){
    const popupImg = evt.target.getAttribute('src');
    const popupImgText = evt.target.alt
    const popupImgAlt = evt.target.getAttribute('alt');
    elementPhoto.alt = elementTitle.textContent;
    popupText.textContent = popupImgText;
    popupPhoto.setAttribute('src', popupImg);
    popupPhoto.setAttribute('alt',popupImgText)
    popup.classList.add("popup_opened");
   })
})

