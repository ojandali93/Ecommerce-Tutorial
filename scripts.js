import data from './data.js';

const itemsContainer = document.querySelector('#items')

const itemList = document.getElementById('item-list')
const itemQuantity = document.getElementById('cart-qty')
const itemTotal = document.getElementById('cart-total')

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

    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            cart[i].quantity +=1
            return;
        }
    }

    const item = {name:name, price:price, quantity:1}

    cart.push(item)
}

function totalQuantity(){

    let quantity = 0

    for(let i=0; i < cart.length; i++){
        quantity += cart[i].quantity
    }
    return quantity
}

function totalAmount(){

    let total = 0

    for(let i=0; i < cart.length; i++){
        total += cart[i].price * cart[i].quantity
    }
    return total.toFixed(2)
}

function showItems() {

    const quantity = totalQuantity()
    const total = totalAmount()

    itemQuantity.innerHTML = `You have ${quantity} items in your cart!`
    itemTotal.innerHTML = `Your cart total is: ${total}`

    let itemString = ''
    for(let i=0; i < cart.length; i++){
        const name = cart[i].name
        const price = cart[i].price
        const quantity = cart[i].quantity
        itemString += `<li> ${name} | $${price} X ${quantity} = ${price * quantity}</li>` 
    }
    itemList.innerHTML = itemString
}

function removeItem(name){
    for (let i=0; i < cart.length; i++){
        if(cart[i].name === name){
            if(cart[i].quantity > 1){
                cart[i].quantity -= 1
                return;
            } else {
                cart.splice(i, 1)
            }
        }
    }
}

addItem('happy', 1.00)
addItem('Sad', 3.99)
addItem('Sad', 3.99)
showItems()
removeItem('Sad')
showItems()