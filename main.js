var viewCartButton = document.getElementsByClassName('view-cart')[0];
var shoppingCart = document.getElementsByClassName('shopping-cart')[0];
var products = document.getElementsByClassName('products')[0];
var clearCartButton = document.getElementsByClassName('clear-cart')[0];
var deleteItemButton = document.getElementsByClassName('glyphicon-trash');
var cart = [];
var STORAGE_ID = 'hipster-shopping';

var saveToLocalStorage = function () {
  localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
};

var getFromLocalStorage = function () {
  return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
};

var renderCart = function() {
  // : empty `.cart-list`
  var cartList = document.getElementsByClassName('cart-list')[0];
  var total = 0;

  cartList.innerHTML = '';
  // : loop through _cart_ and create new HTML based on our objects
  // : append the new HTML to the page
  cart.forEach(function(item, i) {
    var itemDiv = document.createElement('div');
    var itemVal;
    var deleteIcon = document.createElement('span');

    if (item.quantity > 1) {
      itemVal = document.createTextNode(item.name + ' (' + item.quantity + ') - $' + item.price * item.quantity);
    } else {
      itemVal = document.createTextNode(item.name + ' - $' + item.price * item.quantity);
    }

    deleteIcon.classList.add('glyphicon', 'glyphicon-trash');

    deleteIcon.addEventListener('click', function(e) {
      var index = e.target.closest('.cart-item').getAttribute('data-item-id');
      remove1(index);
    });

    itemDiv.appendChild(itemVal);
    itemDiv.appendChild(deleteIcon);
    itemDiv.classList.add('cart-item');
    itemDiv.setAttribute('data-item-id', i);
    cartList.appendChild(itemDiv);
    total += Number(item.price * item.quantity);
  });
  document.getElementsByClassName('total')[0].innerHTML = total;

  saveToLocalStorage();
};

var itemInCart = function(itemName) {
  var itemExists = cart.find(function(item) {
    return item.name === itemName;
  });

  if (itemExists) {
    return true;
  }
};

var add1 = function(itemName) {
  cart.forEach(function(el, i) {
    if (el.name == itemName) {
      cart[i].quantity += 1;
    }
  });
};

var remove1 = function(index) {
  if (cart[index].quantity == 1) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity -= 1;
  }
  renderCart();
};

viewCartButton.addEventListener('click', function() {
  if (shoppingCart.classList.contains('show')) {
    shoppingCart.classList.remove('show');
  } else {
    shoppingCart.classList.add('show');
  }
});

products.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-cart')) {
    var itemName = e.target.closest('.item')
      .getAttribute('data-name');

    var itemPrice = e.target.closest('.item')
      .getAttribute('data-price');

    if (itemInCart(itemName)) {
      add1(itemName);
    } else {
      cart.push({
        name: itemName,
        price: itemPrice,
        quantity: 1
      });
    }

    renderCart();
  }
});

clearCartButton.addEventListener('click', function() {
  cart = [];
  renderCart();
});

$(document).ready(function() {
  cart = getFromLocalStorage();
  renderCart();
});
