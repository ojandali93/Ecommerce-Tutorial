import data from './data.js';

const itemsContainer = document.querySelector('#items')

const itemList = document.getElementById('item-list')
const itemQuantity = document.getElementById('cart-qty')
const itemTotal = document.getElementById('cart-total')

// const all_items_button = document.querySelectorAll("button")
// const all_items_button = Array.from(document.querySelectorAll("button"))
// console.log(all_items_button)

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

	itemsContainer.appendChild(newDiv)
}

const cart = []

itemList.onclick = function(e) {
    if (e.target && e.target.classList.contains('remove')){
        const name = e.target.dataset.name
        removeItem(name)
    } else if(e.target && e.target.classList.contains('decrease')){
        const name = e.target.dataset.name
        decreaseQuantity(name)
    } else if(e.target && e.target.classList.contains('increase')){
        const name = e.target.dataset.name
        const price = e.target.dataset.price
        addItem(name, price)
    }
}

function addItem(name, price) {
    console.log('increased item')
    console

    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            cart[i].quantity +=1
            showItems()
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
        itemString += `<li> ${name} | $${price} X ${quantity} = ${price * quantity}
        <button class="remove" data-name="${name}">Remove</button>
        <button class="increase" data-name="${name}">+</button>
        <button class="decrease" data-name="${name}">-</button>
        </li>` 
    }
    itemList.innerHTML = itemString
}

function removeItem(name){
    for (let i=0; i < cart.length; i++){
        if(cart[i].name === name){
            cart.splice(i, 1)
        }
    }
    showItems()
}

function decreaseQuantity(name){
    console.log('decreased item')

    for (let i=0; i < cart.length; i++){
        if(cart[i].name === name){
            if(cart[i].quantity > 1){
                cart[i].quantity -= 1
                showItems()
                return;
            } else {
                cart.splice(i, 1)
                showItems()
            }
        }
    }
}

const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))

// addItem('happy', 1.00)
// addItem('Sad', 3.99)
// addItem('Sad', 3.99)
// showItems()
// removeItem('Sad')
// showItems()