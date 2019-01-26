/*Сеть фастфудов предлагает несколько видов гамбургеров:
** - маленький (50 рублей, 20 калорий);**
- большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
** - сыром (+ 10 рублей, + 20 калорий);**
** - салатом (+ 20 рублей, + 5 калорий);**
- картофелем (+ 15 рублей, + 10 калорий).

*Дополнительно гамбургер можно посыпать приправой (+ 15 рублей, 0 калорий) и полить майонезом (+ 20 рублей, + 5 калорий). *

Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Используйте ООП-подход (подсказка: нужен класс Гамбургер, константы, методы для выбора опций и расчета нужных величин).
*/

/**
* Класс, объекты которого описывают параметры гамбургера. 
*
* @constructor
* @param size        Размер
* @param stuffing    Начинка
* @throws {HamburgerException}  При неправильном использовании */
function Hamburger(size, stuffing) {
    if (!size) {
		throw new HamburgerException("no size given");
	}
    if (size !== Hamburger.SIZE_SMALL && size !== Hamburger.SIZE_LARGE) {
        throw new HamburgerException("invalid size");
    }
	
	if (!stuffing) {
		throw new HamburgerException("no stuffing given");
	}
	if (stuffing !== Hamburger.STUFFING_CHEESE && stuffing !== Hamburger.STUFFING_SALAD && stuffing !== Hamburger.STUFFING_POTATO) {
        throw new HamburgerException("invalid stuffing");
    }
    
	this.size = size;
    this.stuffing = stuffing;

	this.topping = [];
}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {price: 50, calories: 20};
Hamburger.SIZE_LARGE = {price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10};
Hamburger.TOPPING_MAYO = {price: 20, calories: 5};
Hamburger.TOPPING_SPICE = {price: 15, calories: 0};

/**
* Добавить добавку к гамбургеру. Можно добавить несколько
* – при условии, что они разные.
* 
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании */
Hamburger.prototype.addTopping = function (topping) {
    if (!topping) {
		throw new HamburgerException("no topping given");
	}
    if (topping !== Hamburger.TOPPING_MAYO && topping !== Hamburger.TOPPING_SPICE) {
        throw new HamburgerException("invalid topping");
    }
    for (var i = 0; i < this.topping.length; i++) {
		if (this.topping[i] === topping) {
        throw new HamburgerException("duplicate topping");
        }
    }
    
	this.topping.push(topping);
}

/**
* Убрать добавку – при условии, что она ранее была
* добавлена.
* 
* @param topping   Тип добавки
* @throws {HamburgerException}  При неправильном использовании  */
Hamburger.prototype.removeTopping = function (topping) {
    if (!topping) {
		throw new HamburgerException("no topping given");
	}
    if (topping !== Hamburger.TOPPING_MAYO && topping !== Hamburger.TOPPING_SPICE) {
        throw new HamburgerException("invalid topping");
    }
    
	for (var i = 0; i < this.topping.length; i++) {
		if (this.topping[i] === topping) {
			this.topping.splice(topping[i], 1);
		}
	}
}

/**
* Получить список добавок.
*
* @return {Array} Массив добавленных добавок, содержит константы
*                 Hamburger.TOPPING_*
*/
Hamburger.prototype.getToppings = function () {
	return this.topping;
}

/**
* Узнать размер гамбургера
*/
Hamburger.prototype.getSize = function () {
	return this.size;
}

/**
* Узнать начинку гамбургера
*/
Hamburger.prototype.getStuffing = function () {
	return this.stuffing;
}

/**
* Узнать цену гамбургера
* @return {Number} Цена в тугриках
*/
Hamburger.prototype.calculatePrice = function () {
	var totalPrice = 0;
	totalPrice = this.size.price + this.stuffing.price;
	for (var i = 0; i < this.topping.length; i++) {
		totalPrice += this.topping[i].price;
	}
	return totalPrice;
}

/**
* Узнать калорийность
* @return {Number} Калорийность в калориях  */
Hamburger.prototype.calculateCalories = function () {
	var totalCalories = 0;
	totalCalories = this.size.calories + this.stuffing.calories;
	for (var i = 0; i < this.topping.length; i++) {
		totalCalories += this.topping[i].calories;
	}
	return totalCalories;
}

/**
* Представляет информацию об ошибке в ходе работы с гамбургером. 
* Подробности хранятся в свойстве message.
* @constructor
*/
function HamburgerException(message) {
	this.message = message;
}

//-------------------------------------------

// маленький гамбургер с начинкой из сыра
var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());

// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());

// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);

// А сколько теперь стоит? 
console.log("Price with sauce: %f", hamburger.calculatePrice());

// Проверить, большой ли гамбургер? 
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1

// Обработка ошибок

// не передали обязательные параметры
//var h2 = new Hamburger();
// => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
//var h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size

// добавляем много добавок
// var h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// hamburger.addTopping(Hamburger.TOPPING_MAYO);
// hamburger.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'