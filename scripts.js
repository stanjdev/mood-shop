import data from './data.js';

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const qtyDisplay = document.getElementById('cart-qty');
const totalDisplay = document.getElementById('cart-total');

// for (let i = 0; i < data.length; i++) {
//   const newDiv = document.createElement('div');
//   newDiv.className = 'item';
//   const img = document.createElement('img');
//   img.src = data[i].image;
//   img.width = 300;
//   img.height = 300;
//   const desc = document.createElement('p');
//   desc.innerText = data[i].desc;
//   const name = document.createElement('p');
//   name.innerText = data[i].name;
//   const price = document.createElement('p');
//   price.innerText = data[i].price;
//   newDiv.appendChild(img);
//   // newDiv.appendChild(name);
//   newDiv.appendChild(desc);
//   newDiv.appendChild(price);
//   console.log(img);
//   itemsContainer.appendChild(newDiv);
// };

// ES6 forEach()
data.forEach(mood => {
  const newDiv = document.createElement('div');
  newDiv.className = 'item';
  const img = document.createElement('img');
  img.src = mood.image;
  img.width = 300;
  img.height = 300;
  img.title = mood.name;
  const desc = document.createElement('p');
  desc.innerText = mood.desc;
  const name = document.createElement('p');
  name.innerText = mood.name;
  const price = document.createElement('p');
  const button = document.createElement('button');
  button.id = mood.name;
  button.dataset.price = mood.price;
  button.innerHTML = "Add to Cart"
  button.addEventListener("click", (e) => {
    const mood = e.target.id;
    const price = Number(e.target.dataset.price);
    addItem(mood, price);
  })
  price.innerText = "$" + mood.price;
  newDiv.appendChild(img);
  // newDiv.appendChild(name);
  newDiv.appendChild(desc);
  newDiv.appendChild(price);
  newDiv.appendChild(button);
  console.log(img);
  itemsContainer.appendChild(newDiv);
});

/* 
{
  'happy': {
    price: 5.99,
    quantity: 2,
  }
}
shoppingCart[mood] !== undefined ? shoppingCart[mood].quantity++ : shoppingCart[mood] = {
  'price': price,
  'quantity': 1
}
*/
const shoppingCart = {};

function addItem(mood, price) {
  shoppingCart[mood] !== undefined ? shoppingCart[mood].quantity++ : shoppingCart[mood] = {
    price,
    'quantity': 1
  }
  showItems();
  // setTimeout(() => {
  //   removeItem(mood);
  // }, 1000);
};

function removeItem(mood, qty = 0) {
  if (shoppingCart[mood] !== undefined) {
    if (shoppingCart[mood].quantity > 0) shoppingCart[mood].quantity--;
    if (shoppingCart[mood].quantity < 1 || qty == 0) delete shoppingCart[mood] // delete keyword when working with Objects
  }
  console.log(shoppingCart);
  // for an array, use splice(i, 1) to remove specific
};

function getQty(items) {
  let totalQuantity = 0;
  items.forEach(item => {
    totalQuantity += item[1].quantity;
  })
  return totalQuantity;
};

function getTotal(items) {
  let totalPrice = 0;
  items.forEach(item => {
    totalPrice += Number((item[1].price * item[1].quantity).toFixed(2));
  })
  return totalPrice.toFixed(2);
}

function showItems() {
  const items = Object.entries(shoppingCart);
  qtyDisplay.innerHTML = `Total items in your cart: ${getQty(items)}`;

  let itemStr = "";
  items.forEach(item => {
    const { price, quantity } = item[1];
    let priceOfItem = (price * quantity).toFixed(2);
    itemStr += `<li>${item[0]} $${price} x${quantity} = $${priceOfItem}</li>`;
  });
  itemList.innerHTML = itemStr;
  
  totalDisplay.innerHTML = `Total price: $${getTotal(items)}`;
};