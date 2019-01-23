// public, protected, private

function Container(id, className, tagName) {
  // public
  this.id = id;
  this.className = className;

  // protected
  this._tagName = tagName;

  // private
  var element;

  this.getElement = function() {
    return element;
  }

  this.setElement = function(newValue) {
    element = newValue;
  }
}

Container.prototype.render = function() {
  var element = this.getElement();

  if (!element) {
    element = document.createElement(this._tagName);
    element.id = this.id;
    element.className = this.className;

    this.setElement(element);
  }

  return element;
}

Container.prototype.remove = function() {
  var element = this.getElement();

  if(element) {
    element.parentElement.removeChild(element);
    this.setElement(null);
  }
}

function Menu(id, className, items) {
  Container.call(this, id, className, 'ul');

  // protected
  this._items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function() {
  var container = Container.prototype.render.call(this);
  
  this._items.forEach(function(item) {
    if(item instanceof Container) {
      container.appendChild(item.render());
    }
  });

  return container;
}

function MenuItem(className, link, title) {
  Container.call(this, '', className, 'li');

  this.link = link;
  this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function() {
  var container = Container.prototype.render.call(this);

  var a = document.createElement('a');
  a.textContent = this.title;
  a.href = this.link;

  container.appendChild(a);

  return container;
}

function SuperMenu(id, className, items, link, title) {
  MenuItem.call(this, 'item', link, title);
  Menu.call(this, id, className, items);
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function() {
  if(this.link && this.title) {
    var menuItem = new MenuItem('item', this.link, this.title).render();
    var menu = Menu.prototype.render.call(this);
    menuItem.appendChild(menu);

    return menuItem;
  } else {
    return Menu.prototype.render.call(this);
  }
}

var menuItem1 = new MenuItem('menu-item', '/about', 'О КОМПАНИИ');
var menuItem2 = new MenuItem('menu-item', '/news', 'НОВОСТИ');
var menuItem3 = new MenuItem('menu-item', '/overviews', 'ОБЗОРЫ');
var menuItem4 = new MenuItem('menu-item', '/articles', 'СТАТЬИ');
var menuItem5 = new MenuItem('menu-item', '/service', 'СЕРВИС');
var menuItem6 = new MenuItem('menu-item', '/forum', 'ФОРУМ');
var menuItem7 = new MenuItem('menu-item', '/advice', 'СОВЕТЫ');
var menuItem8 = new MenuItem('menu-item', '/shops', 'МАГАЗИНЫ И КОНТАКТЫ');
var menuItem9 = new MenuItem('menu-item', '/new', 'НОВЫЕ ПОСТУПЛЕНИЯ');
var menuItem10 = new MenuItem('menu-item', '/promo', 'ПРОМОАКЦИИ');
var menuItem11 = new MenuItem('menu-item', '/send', 'ДОСТАВКА');
var menuItem12 = new MenuItem('menu-item', '/pay', 'ОПЛАТА');
var menuItem13 = new MenuItem('menu-item', '/logon', 'ВОЙТИ');
var menuItem14 = new MenuItem('menu-item', '/reg', 'РЕГИСТРАЦИЯ');

var menu1 = new SuperMenu('menu1', 'menu', [
  menuItem9,
  menuItem10
], '/catalog', 'КАТАЛОГ');

var menu2 = new SuperMenu('menu2', 'menu', [
  menuItem11,
  menuItem12
], '/information', 'ДОСТАВКА И ОПЛАТА');

var menu3 = new SuperMenu('menu3', 'menu', [
  menuItem13,
  menuItem14
], '/lk', 'ЛИЧНЫЙ КАБИНЕТ');

var menu4 = new SuperMenu('main-menu', 'menu', [
  menuItem1,
  menuItem2,
  menu1,
  menuItem3,
  menuItem4,
  menuItem5,
  menu2,
  menuItem6,
  menuItem7,
  menuItem8,
  menu3
]);


document.body.appendChild(menu4.render());
