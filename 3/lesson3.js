/*1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. Придумать шаблон, который меняет одинарные кавычки на двойные.*/

var $element;
var result;
var inputText = "Lorem, 'ipsum fv'fd vfdv'? 'ffvdd fvdfvd?'."

$element = document.getElementById("task1");
$element.innerText += " " + inputText;

$element = document.getElementById("result1");
result = inputText.replace(/(\'\w)|(\w\')/g, '"');
$element.innerText += " " + result;

/*2. Улучшить шаблон таким образом, чтобы конструкции типа aren’t не меняли одинарную кавычку на двойную.*/

$element = document.getElementById("task2");
$element.innerText += " " + inputText;

$element = document.getElementById("result2");
result = inputText.replace(/(\b'\B)|(\B'\b)|(\B'\B)/g, '"');
$element.innerText += " " + result;

/*3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

- Имя содержит только буквы;

** - Телефон подчиняется шаблону +7(000)000-0000;**

** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

** - Текст произвольный;**
** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой и сообщать пользователю об ошибке.***/

document.getElementById("submit").addEventListener("click", function () {
    var correctResult = true;
    var $element;
    
    $element = document.getElementById("error-text");
    $element.innerText = "";
    
    $element = document.getElementById("name");
    $element.classList.remove("invalid");
    if(!checkName($element.value)){
        correctResult = false;
        errorAlert($element);
    }
    
    $element = document.getElementById("phone");
    $element.classList.remove("invalid");
    if(!checkPhone($element.value)){
        correctResult = false;
        errorAlert($element);
    }
    
    $element = document.getElementById("email");
    $element.classList.remove("invalid");
    if(!checkEmail($element.value)){
        correctResult = false;
        errorAlert($element);
    }
    
    if (correctResult) sendMessage();
});

function checkName(string) {
    var reg = /^[a-zA-Zа-яА-Я]+$/;
    return reg.test(string);
}

function checkPhone(string) {
    var reg = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;
    return reg.test(string);
}

function checkEmail(string) {
    var reg = /^[\w][\w\-\.]+[\w]@[\w][\w\-\.]+[\.][\w]+$/;
    return reg.test(string);
}

function errorAlert(element) {
    var $element = document.getElementById("error-text");
    $element.innerText = "Внимание! Проверьте правильность заполнения полей";
    element.classList.add("invalid");
}

function sendMessage() {
    alert("Ваше сообщение успешно отправлено");
}