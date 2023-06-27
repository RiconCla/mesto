// Находим попапы в DOM
const popupElement = document.querySelectorAll('.popup');// Находим попапs в DOM
const editProfile = document.querySelector('.popup__form_edit');//Находи попап редактирования профиля
const editMesto = document.querySelector('.popup_type_form_add-img');//Находи попап добавления места
const cardPopupImage = document.querySelector('.popup_type_display-image-img');//Находи попап открытия карточки
const modalImage = cardPopupImage.querySelector('.popup__image'); //Находи попап открытия карточки места

// Профиль (Редактирование имени и описания)
const profile = document.querySelector('.profile'); //Находим элемент профиля
const profileName = profile.querySelector('.profile__name');// Выбераем элементы, куда должны быть вставлены значения полей
const profileDescription = profile.querySelector('.profile__description'); // Выбераем элементы, куда должны быть вставлены значения полей
const editProfileButton  = profile.querySelector('.profile__edit-button');// Находим кнопку редактирования профиля

//Профиль (форма)
const formProfileEdit = editProfile.querySelector('.popup__form'); //Находим элемент формы профиля
const nameInput = formProfileEdit.querySelector('.popup__input_edit_profile-name');// Находим поля формы в DOM
const descriptionInput = formProfileEdit.querySelector('.popup__input_edit_profile-description');// Находим поля формы в DOM

// Профиль (загрузка карточек через js)
const cardTemplate = document.querySelector('#element-template').content; //Находим темплейт элемент карточек мест в DOM и получаем доступ к его содержимому
const cards = document.querySelector('.cards');// Записываем содержимое в переменную

//Добавление места
const formAddMesto = editMesto.querySelector('.popup__form'); //Находим элемент формы места
const cardNameInput = editMesto.querySelector('.popup__input_add_mesto-name'); // Находим поля формы в DOM
const cardUrlInput = editMesto.querySelector('.popup__input_add_mesto-url');// Находим поля формы в DOM
const buttonAddNewMesto = profile.querySelector('.profile__add-button');//Находим кнопку добавления места
const cardImage = editMesto.querySelector('.cards__image');//Находим селектор с картинкой места
const cardName = editMesto.querySelector('.cards__name');//Находим селектор с названием места

//Кнопки закрытия попапов
const closeProfileButton = editProfile.querySelector('.popup__button-close');// Находим кнопку закрытия карточки редактирования профиля
const closeMestoButton = editMesto.querySelector('.popup__button-close');// Находим кнопку закрытия карточки редактирования места

//Попап открытой карточки места
const modalTitle = cardPopupImage.querySelector('.popup__description'); //Находим в попапе селектор с названием места
const closeModalImage = cardPopupImage.querySelector('.popup__button-close'); //Находим кнопку закрытия попа места

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
    cardLikeButton.classList.toggle('cards__like_active') // после клика меняем класс лайка на активный
  });
  
  cardDeleteButton.addEventListener('click', () => { // Создаем слушатель по клику на удаление карточки
    const cardItem = cardDeleteButton.closest('.cards__item') // Получаем родительский элемент, в данном случае карточку места
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
  cards.prepend(createCards(item)); //Вставляем карточку в начало списка
}

//Считываем элементы из исходного массива initialCards
function readCardsFromArray (arr) {
  for (let i = 0; i < arr.length; i ++){
    renderCard(arr[i]); //Передаем элементы для отображения на странице
  };
};

//Функция создания нового места из формы
function addNewMesto (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  newMesto = {}; // Создаем объект
  newMesto.name = cardNameInput.value; // Заносим имя места
  newMesto.link = cardUrlInput.value; // Заносим ссылку на изображение
  renderCard(newMesto); // Добавляем карточку места на страницу
  closePopup(editMesto); // По клику на кнопку "сохранить", закрывает попап
}

// Функция редактирования профиля (имя, описание)
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получаем значение полей descriptionInput и nameInput из свойства value
  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
    closePopup(editProfile);// По клику на кнопку "сохранить", закрывает попап
}

//Открываем попап. Проверям что передано в качестве аргументов и заполняем инпуты
function openPopup (e) {
    e.classList.add('popup_opened');
    if (e === editProfile) { //Если профиль, то заносим значения из профиля в инпуты
      nameInput.value = profileName.textContent;
      descriptionInput.value = profileDescription.textContent;
    }
    else if (e === editMesto) { //Если редактируем место, обнуляем инпуты
      cardNameInput.value = "";
      cardUrlInput.value = "";
    }
} // Иначе, ничего не делаем

//Закрываем попап
function closePopup (e) {
    e.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileEdit.addEventListener('submit', handleFormSubmit); 

formAddMesto.addEventListener('submit', addNewMesto); // Прикрепляем обработчик к форме

readCardsFromArray(initialCards); //Считываем карточки мест из массива initialCards

buttonAddNewMesto.addEventListener('click', () => openPopup(editMesto)); //По клику на кнопку "+" в профиле, открывает попап добавления места
editProfileButton.addEventListener('click', () => openPopup(editProfile));// По клику на кнопку "карандаш" в профиле, открывает попап
closeProfileButton.addEventListener('click', () => closePopup(editProfile));// По клику на кнопку "крест" попапа, закрывает попап редактирования профиля
closeMestoButton.addEventListener('click', () => closePopup(editMesto));// По клику на кнопку "крест" попапа, закрывает попап создания места
closeModalImage.addEventListener('click', () => closePopup(cardPopupImage));// По клику на кнопку "крест" попапа, закрывает попап с карточкой места
