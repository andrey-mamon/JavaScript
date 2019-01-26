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

var menuItem1 = new MenuItem('menu-item', '/catalog/shirts', 'Shirts');
var menuItem2 = new MenuItem('menu-item', '/catalog/boots', 'Boots');

var menu1 = new SuperMenu('menu1', 'menu', [ menuItem1, menuItem2 ], '/catalog', 'Catalog');;

var menuItem3 = new MenuItem('menu-item', '/shop', 'Shop');
var menuItem4 = new MenuItem('menu-item', '/cart', 'Cart');

var menu2 = new SuperMenu('menu2', 'menu', [
  menu1,
  menuItem3,
  menuItem4
], '/main', 'Main');

var menuItem5 = new MenuItem('menu-item', '/news', 'News');
var menuItem6 = new MenuItem('menu-item', '/blog', 'Blog');

var menu3 = new SuperMenu('menu3', 'menu', [
  menuItem5,
  menuItem6,
  menu2
]);


document.body.appendChild(menu3.render());
