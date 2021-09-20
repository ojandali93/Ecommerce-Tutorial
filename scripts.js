import data from './data.js';

const itemsContainer = document.querySelector('#items')

for (let i = 0; i < data.length; i++) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
    const img = document.createElement('img');
    const des = document.createElement('p');
    const price = document.createElement('p');
    const button = document.createElement('button')
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
    img.height = 300
    des.innerHTML = data[i].desc
    price.innerHTML = data[i].price
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
	// Add the image to the div
    newDiv.appendChild(img)
    newDiv.appendChild(des)
    newDiv.appendChild(price)
    newDiv.appendChild(button)
	console.log(img) // Check the console!
	itemsContainer.appendChild(newDiv)
}

const cart = []

function addItem(name, price) {
    const item = {name:name, price:price, quantity:1}
    console.log(item)
    cart.push(item)
}

function showItems() {
    console.log(`You have ${cart.length} items in your cart!`)
}

addItem('happy', 1.00)
showItems()