// Находим кнопку редактирования профиля
const editProfileButton  = document.querySelector('.profile__edit-button');

// Находим кнопку сохранения информации в карточке редактирования профиля
const saveProfileButton = document.querySelector('.popup__button-save');

// Находим попап в DOM
const popupElement = document.querySelector('.popup');

// Находим кнопку закрытия карточки редактирования профиля
const closePopupButton = document.querySelector('.popup__button-close');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__profile-name');
let descriptionInput = document.querySelector('.popup__profile-description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получаем значение полей jobInput и nameInput из свойства value
    nameInput.value;
    descriptionInput.value;

    // Выбераем элементы, куда должны быть вставлены значения полей
    let profleName = document.querySelector('.profile__name');
    let profileDescription = document.querySelector('.profile__description'); 

    // Вставляем новые значения с помощью textContent
    profleName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

//Открываем попап
function openPopup () {
    popupElement.classList.toggle('popup_opened');
}
//Закрываем попап
function closePopup () {
    popupElement.classList.toggle('popup_opened');
}

// По клику на кнопку "карандаш" в профиле, открывает попап
editProfileButton.addEventListener('click', openPopup);
// По клику на кнопку "сохранить", закрывает попап
saveProfileButton.addEventListener('click',closePopup);
// По клику на кнопку "крест" попапа, закрывает попап
closePopupButton.addEventListener('click', closePopup);