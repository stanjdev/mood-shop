import data from './data.js';

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const qtyDisplay = document.getElementById('cart-qty');
const totalDisplay = document.getElementById('cart-total');
const shoppingCartTitle = document.getElementById('shopping-cart');
const checkoutBtnContainer = document.getElementById('checkout');
const checkoutBtn = document.createElement('button');

// ES6 forEach()
data.forEach(mood => {
  const newDiv = document.createElement('div');
  newDiv.className = 'item';
  const img = document.createElement('img');
  const frame = document.createElement('div');
  frame.className = "picture-frame";
  const textFrame = document.createElement('div');
  textFrame.className = "text-frame";
  const buttonHolder = document.createElement('div');
  buttonHolder.className = "button-holder";
  img.src = mood.image;
  img.width = 300;
  img.height = 300;
  img.title = mood.name;
  const desc = document.createElement('span');
  desc.innerText = mood.desc;
  const price = document.createElement('span');
  // Add to cart buttons and logic:
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
  frame.appendChild(img);
  textFrame.appendChild(desc);
  buttonHolder.append(price);
  buttonHolder.append(button);
  newDiv.appendChild(frame);
  newDiv.appendChild(textFrame);
  newDiv.appendChild(buttonHolder);
  console.log(img);
  itemsContainer.appendChild(newDiv);
});

/* Alternative way to access add to cart buttons AFTER they're created: */
// const all_items_button = Array.from(document.querySelectorAll('button'));
// console.log(all_items_button);
// all_items_button.forEach(element => {
//   element.addEventListener('click', () => {
//     console.log(element.getAttribute('id'), element.getAttribute('data-price'))
//   })
// });


const shoppingCart = {};
/* Data in my object looks like this example:
{
  'happy': {
    price: 5.99,
    quantity: 2,
  }
}
*/

function addItem(mood, price) {
  shoppingCart[mood] !== undefined ? shoppingCart[mood].quantity++ : shoppingCart[mood] = {
    price,
    'quantity': 1
  }
  return showItems();
};

function removeItem(mood, qty = 0) {
  if (shoppingCart[mood] !== undefined) {
    if (shoppingCart[mood].quantity > 0) shoppingCart[mood].quantity--;
    if (shoppingCart[mood].quantity < 1 || qty == 0) delete shoppingCart[mood] // delete keyword when working with Objects
  }
  return showItems(); // to refresh the list after removing an item
  // for an array, use splice(i, 1) to remove specific
};

function updateCart(mood, qty) {
  if (qty < 1) removeItem(mood);
  else shoppingCart[mood].quantity = qty;
  return showItems();
};

itemList.onclick = function(e) {
  const name = e.target.dataset.name;
  if (e.target && e.target.classList.contains('remove')) removeItem(name);
  else if (e.target && e.target.classList.contains('increment')) addItem(name);
  else if (e.target && e.target.classList.contains('decrement')) removeItem(name, 1);
};

itemList.onchange = function(e) {
  if (e.target && e.target.classList.contains('update')) {
    const name = e.target.dataset.name;
    const qty = parseInt(e.target.value);
    updateCart(name, qty);
  }
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
  shoppingCartTitle.innerHTML = "Shopping Cart";
  shoppingCartTitle.style.textAlign = "center";
  qtyDisplay.innerHTML = `Total items in your cart: ${getQty(items)}`;

  let itemStr = "";
  items.forEach(item => {
    const name = item[0];
    const { price, quantity } = item[1];
    let priceOfItem = (price * quantity).toFixed(2);
    itemStr += `<li>
      <div class="item-line-text">
        <span>${name}</span> 
        <span>$${price} x ${quantity} = $${priceOfItem} </span>
      </div>
      <div>
        <button class="remove" data-name=${name}>Remove</button>
        <button class="increment" data-name=${name}> + </button>
        <button class="decrement" data-name=${name}> - </button>
        <input class="update" type="number" data-name=${name} placeholder="Enter quantity:" min="0">
      </div>
    </li>`;
  });
  itemList.innerHTML = itemStr;

  totalDisplay.innerHTML = `Total price: $${getTotal(items)}`;
  totalDisplay.style.fontWeight = "bold";

  checkoutBtn.innerHTML = "Checkout";
  checkoutBtn.style.fontWeight = "bold";
  checkoutBtnContainer.appendChild(checkoutBtn);
};