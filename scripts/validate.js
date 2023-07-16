// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, cfg) => {
    const formErrorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(cfg.inputErrorClass);
    formErrorElement.textContent = errorMessage;
    formErrorElement.classList.add(cfg.errorClass);
  };
  
  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement, cfg) => {
    const formErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(cfg.inputErrorClass);
    formErrorElement.classList.remove(cfg.errorClass);
    formErrorElement.textContent = '';
  };
  
  //Функция, которая отображает сообщения об ошибках ввода
  const checkInputValidity = (formElement, inputElement, cfg) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, cfg);
    } else {
      hideInputError(formElement, inputElement, cfg);
    };
  };

  //Функция, которая проверяет валидность инпутов
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  //Функция, включения кнопки "сохранить"
  const disableButton = (button, cfg) => {
    button.classList.add(cfg.inactiveButtonClass); 
    button.disabled = true;//Задаем булево значения для понимания статуса
  };

//Функция, отключения кнопки "сохранить"
const enableButton = (button, cfg) => {
    button.classList.remove(cfg.inactiveButtonClass); 
    button.disabled = false;//Задаем булево значения для понимания статуса
  };

//Функция, переключения кнопки "сохранить" в зависомости от валидности полей ввода
const toggleButtonState = (inputList, buttonElement, cfg) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, cfg);
    } 
    else {
      enableButton(buttonElement, cfg);
    };
  };

//Функция добавления слушателей на инпуты форм
const setEventListeners = (formElement, cfg) => {
    const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
    const buttonElement = formElement.querySelector(cfg.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, cfg);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, cfg);
        toggleButtonState(inputList, buttonElement, cfg);
      });
    });
  };

//Функция валидации
const enableValidation = (cfg) => {
    const formList = Array.from(document.querySelectorAll(cfg.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, cfg);
    });
  };
  
  enableValidation(VALIDATION_CONFIG);