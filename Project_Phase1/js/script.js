//Initial calls





//Features handling - slides
let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    const offset = -slideIndex * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

// Auto slide
setInterval(nextSlide, 3000);




//----------------------------------------------------------------------------------------------------------------------

//Products, items, shopping cart
let itemList = document.querySelector('.items');
let cartList = document.querySelector('.cart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let items = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(items.length > 0) // if has data
        {
            items.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                itemList.appendChild(newProduct);
            });
        }
    }
    itemList.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    cartList.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = items.findIndex((value) => value.id == item.product_id);
            let info = items[positionProduct];
            cartList.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

cartList.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let itemPostition = cart.findIndex((value) => value.product_id == product_id);
    if(itemPostition >= 0){
        let info = cart[itemPostition];
        switch (type) {
            case 'plus':
                info.quantity = info.quantity + 1;
                break;
        
            default:
                let changeQuantity = info.quantity - 1;
                if (changeQuantity > 0) {
                    info.quantity = changeQuantity;
                }else{
                    cart.splice(itemPostition, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('items.json')
  .then(response => response.json())
  .then(data => {
    // Display all items initially
    items = data
    addDataToHTML()

    // get data cart from memory
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }

    // Listen for input in the search box
    document.getElementById('#search').addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const filteredItems = data.filter(item => item.name.toLowerCase().includes(searchTerm));
      items = filteredItems
      displayItems(filteredItems);
    });
  })
  .catch(error => console.error('Error fetching items:', error));
}
initApp();


//----------------------------------------------------------------------------------------------------------------------

//Searching for items

// Load items from items.json


// Function to display items
function displayItems(items) {
  const itemsContainer = document.querySelector('.items');
  itemsContainer.innerHTML = '';
  items.forEach(product => {
    let newProduct = document.createElement('div');
    newProduct.dataset.id = product.id;
    newProduct.classList.add('item');
    newProduct.innerHTML = 
        `<img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart">Add To Cart</button>`;
    itemList.appendChild(newProduct);
  });
}

//----------------------------------------------------------------------------------------------------------------------
//Login Verification so customer can checkout
function isLoggedIn(){
var username = localStorage.getItem('username')
if(username){
    window.location.href="checkout.html"

}
else{
    window.location.href = "login.html"
}
}










