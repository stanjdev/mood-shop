import data from './data.js';

const itemsContainer = document.querySelector('#items');

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
let totalPrice = 0;

function addItem(mood, price) {
  totalPrice += price;
  console.log(totalPrice);

  shoppingCart[mood] !== undefined ? shoppingCart[mood].quantity++ : shoppingCart[mood] = {
    'price': price,
    'quantity': 1
  }

  console.log(shoppingCart);
};

function showItems() {

};