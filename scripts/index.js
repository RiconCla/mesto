// Включаем строгий режим
'use strict'

// Находим попапы в DOM
const popupElements = document.querySelectorAll('.popup');// Находим попапs в DOM
const popupEditProfile = document.querySelector('.popup_type_form-edit');//Находи попап редактирования профиля
const popupEditMesto = document.querySelector('.popup_type_form-add-img');//Находи попап добавления места
const cardPopupImage = document.querySelector('.popup_type_display-image');//Находи попап открытия карточки
const modalImage = cardPopupImage.querySelector('.popup__image'); //Находи попап открытия карточки места

// Профиль (Редактирование имени и описания)
const profile = document.querySelector('.profile'); //Находим элемент профиля
const profileName = profile.querySelector('.profile__name');// Выбераем элементы, куда должны быть вставлены значения полей
const profileDescription = profile.querySelector('.profile__description'); // Выбераем элементы, куда должны быть вставлены значения полей
const editProfileButton  = profile.querySelector('.profile__edit-button');// Находим кнопку редактирования профиля

//Профиль (форма)
const formProfileEdit = popupEditProfile.querySelector('.popup__form'); //Находим элемент формы профиля
const nameInput = formProfileEdit.querySelector('.popup__text-input_edit_profile-name');// Находим поля формы в DOM
const descriptionInput = formProfileEdit.querySelector('.popup__text-input_edit_profile-description');// Находим поля формы в DOM
const formProfileSubmitButton = popupEditProfile.querySelector('.popup__button-save');//Находим кнопку отправки формы профиля

// Профиль (загрузка карточек через js)
const cardTemplate = document.querySelector('#element-template').content; //Находим темплейт элемент карточек мест в DOM и получаем доступ к его содержимому
const card = document.querySelector('.cards');// Записываем содержимое в переменную

//Добавление места
const formAddMesto = popupEditMesto.querySelector('.popup__form'); //Находим элемент формы места
const cardNameInput = popupEditMesto.querySelector('.popup__text-input_add_mesto-name'); // Находим поля формы в DOM
const cardUrlInput = popupEditMesto.querySelector('.popup__text-input_add_mesto-url');// Находим поля формы в DOM
const buttonAddNewMesto = profile.querySelector('.profile__add-button');//Находим кнопку добавления места
const formAddMestoSubmitButton = popupEditMesto.querySelector('.popup__button-save');//Находим кнопку отправки формы Места

//Кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__button-close');

//Попап открытой карточки места
const modalTitle = cardPopupImage.querySelector('.popup__description'); //Находим в попапе селектор с названием места

//Функция создания карточек
function createCards({name, link}) { //Диструктуризация входного массива
  const card = cardTemplate.cloneNode(true); // копируем ноду с темплейтом
  const cardImage = card.querySelector('.cards__image'); // Находим селектор с изображением места
  const cardName = card.querySelector('.cards__name'); // Находим селектор с именем места
  const cardDeleteButton = card.querySelector('.cards__button-trash'); // Находим кнопку уадления места
  const cardLikeButton = card.querySelector('.cards__like'); // Находим кнопку лайка карточки места
 
  cardName.textContent = name; // Заносим значение названия в карточку из входного массива initialCards
  cardImage.src = link; // Заносим значение ссылки на изображение, в карточку из входного массива initialCards
  cardImage.alt = `Ты офигеешь, но это ${name}!`; // Указываем alt у изображений карточек

  cardLikeButton.addEventListener('click', () => { // Создаем слушатель по клику на лайк
    cardLikeButton.classList.toggle('cards__like_active'); // после клика меняем класс лайка на активный
  });
  
  cardDeleteButton.addEventListener('click', () => { // Создаем слушатель по клику на удаление карточки
    const cardItem = cardDeleteButton.closest('.cards__item'); // Получаем родительский элемент, в данном случае карточку места
    cardItem.remove(); // Удаляем карточку
  });

  cardImage.addEventListener ('click', () => { // Создаем слушатель по клику на карточку для открытия попапа места
    modalImage.src = link; // Заносим значение ссылки на изображение полученной из формы с помощью функции addNewMesto
    modalImage.alt = `Ты офигеешь, но это ${name}!`; // Указываем alt у изображений карточек
    modalTitle.textContent = name; // Заносим название места полученной из формы с помощью функции addNewMesto
    openPopup(cardPopupImage); // Перейдаем значение для открытия попапа
  });

  return card; // Возвращаем готовую карточку
};

//Добавляем на страницу готовую карточку
function renderCard(item) { 
  card.prepend(createCards(item)); //Вставляем карточку в начало списка
};

//Считываем элементы из исходного массива initialCards
function initCardsFromArray (arr) {
  for (let i = 0; i < arr.length; i ++){
    renderCard(arr[i]); //Передаем элементы для отображения на странице
  };
};

//Функция создания нового места из формы
function addNewMesto (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newMesto = {}; // Создаем объект
  newMesto.name = cardNameInput.value; // Заносим имя места
  newMesto.link = cardUrlInput.value; // Заносим ссылку на изображение
  renderCard(newMesto); // Добавляем карточку места на страницу
  closePopup(popupEditMesto); // По клику на кнопку "сохранить", закрывает попап
};

// Функция редактирования профиля (имя, описание)
function handlerEditProfile (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получаем значение полей descriptionInput и nameInput из свойства value
  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  disableButton(formProfileSubmitButton, VALIDATION_CONFIG);
  closePopup(popupEditProfile);// По клику на кнопку "сохранить", закрывает попап
};

//Функция, нахождения ошибок в инпутах, с помощью её вызываем функцию сброса ошибок
function resetInputError(input) {
  const inputList = input.querySelectorAll('.popup__text-input');
  inputList.forEach(inputElement => {
    hideInputError(input, inputElement, VALIDATION_CONFIG);
  });
};

//Открываем попап
function openPopup (evt) {
  evt.classList.add('popup_opened');
  document.addEventListener('keydown', checkPressFromKeyboard);//Создаем слушатель при открытии попапа, которвц отслеживает нажатие на клавиатуре
};

//Функция проверки какая кнопка нажата на клавиатуре
function checkPressFromKeyboard (evt) {
  if (evt.key === "Escape") {
    const popupElement = Array.from(popupElements).find(item => item.classList.contains('popup_opened')); //ищем все элементы у которых есть класс открытого попапа
    closePopup(popupElement);
  };
};

//Функция, проверки клика на оверлей (вне попапов)
function checkClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

//Закрываем попап
function closePopup (evt) {
  evt.classList.remove('popup_opened');
  resetInputError(evt);//Очищаем ошибки при закрытии попапов
  document.removeEventListener('keydown', checkPressFromKeyboard);//После закрытия убираем слушатель с клавиатуры
};

//Функция создания слушателей для кнопок закрытия попапов
closeButtons.forEach((button) => {
  // находим ближайшие к "крестику" попапы
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileEdit.addEventListener('submit', handlerEditProfile); // Обработчик формы редактирования профиля
formAddMesto.addEventListener('submit', addNewMesto); // Прикрепляем обработчик к форме добавления места

buttonAddNewMesto.addEventListener('click', () => {
  formAddMesto.reset(); // При открытии сбрасываем инпуты у формы добавления места
  disableButton(formAddMestoSubmitButton, VALIDATION_CONFIG);
  openPopup(popupEditMesto); //По клику на кнопку "+" в профиле, открывает попап добавления места
});
  
editProfileButton.addEventListener('click', () => { 
  nameInput.value = profileName.textContent; // Заносим в инпуты значения из профиля
  descriptionInput.value = profileDescription.textContent; // Заносим в инпуты значения из профиля
  disableButton(formProfileSubmitButton, VALIDATION_CONFIG);
  openPopup(popupEditProfile);// По клику на кнопку "карандаш" в профиле, открывает попап
});

//Вешаем слушатели на попапы
popupEditProfile.addEventListener('mousedown',checkClickOnOverlay);
popupEditMesto.addEventListener('mousedown', checkClickOnOverlay);
cardPopupImage.addEventListener('mousedown', checkClickOnOverlay);

//Считываем карточки мест из массива initialCards
initCardsFromArray(initialCards);