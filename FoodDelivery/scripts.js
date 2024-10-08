// Data for restaurants and food items
const foodData = [
    { id: 1, name: 'Margherita Pizza', img="https://th.bing.com/th/id/OIP.aUrNLbf-dtMfuY2kGU3qsQHaFF?w=298&h=205&c=7&r=0&o=5&dpr=1.2&pid=1.7",price: 320.00, orders: 0, rating: 4.5, restaurant: ' Dominos Pizza ' },
    { id: 2, name: 'Chicken Pizza', img="https://th.bing.com/th/id/OIP.erUtJTDiOh-z8A3d9XbIZgHaFF?w=270&h=186&c=7&r=0&o=5&dpr=1.2&pid=1.7",price: 370.00, orders: 0, rating: 4.2, restaurant: 'Dominos Pizza ' },
    { id: 3, name: 'Veggie Fiesta',img="https://th.bing.com/th/id/OIP.3LpHfN8ShZck6d5b5c9SJwHaFF?w=240&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7", price: 190.00, orders: 0, rating: 4.2, restaurant: 'Dominos Pizza ' },
    { id: 4, name: 'Tangri Kebab',img="https://th.bing.com/th/id/OIP.wCyAC7b_bSXeLXRyfsckbwAAAA?w=245&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7", price: 820.00, orders: 0, rating: 4.7, restaurant: 'Kebab Factory' },
    { id: 5, name: 'Seekh Kebab', img="https://th.bing.com/th/id/OIP.EzvqrqYRItOjB7koSydCMgHaD8?w=335&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7" ,price: 870.00, orders: 0, rating: 4.6, restaurant: 'Kebab Factory' },
    { id: 6, name: 'Galouti Kebab',img="https://th.bing.com/th/id/OIP.25gRKSd5smoFPXuKhk__jQHaEc?w=291&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7" , price: 930.00, orders: 0, rating: 4.3, restaurant: 'Kebab Factory' },
    { id: 7, name: 'Crispy Veg Burger',img="https://th.bing.com/th/id/OIP.b12Vgm9PXpoLhlmHWXF5swHaE8?w=268&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7", price: 80.00, orders: 0, rating: 4.5, restaurant: 'Burger King'},
    { id: 8, name: 'Crispy Chicken Burger',img="https://th.bing.com/th/id/OIP.IIrnYQw1hUC7D3IAwFOkNgHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.2&pid=1.7", price: 180.00, orders: 0, rating: 4.5, restaurant: 'Burger King' },
    { id: 9, name: 'Cheese Chicken Burger',img="https://th.bing.com/th/id/OIP.t7wc3qYhiakn2FUW10R84AHaE7?w=260&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7", price: 210.00, orders: 0, rating: 4.2, restaurant: 'Burger King' },
    { id: 10, name: 'Mini Tiffin',img="https://th.bing.com/th/id/OIP.MI997dcGtg3MmkVoHWhjAwHaGO?w=200&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7" , price: 120.00, orders: 0, rating: 4.7, restaurant: 'A2B' },
    { id: 11, name: 'Ghee Roast',img="https://th.bing.com/th/id/OIP.UCmg_JT70JRRY1YM8UyR6QHaE8?w=273&h=181&c=7&r=0&o=5&dpr=1.2&pid=1.7", price: 120.00, orders: 0, rating: 4.6, restaurant:  'A2B' },
    { id: 12, name: 'Veg Meals', img="https://th.bing.com/th/id/OIP.MBMy4KW-pJsiiyAaqhWGEgHaHk?w=175&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7" ,price: 220.00, orders: 0, rating: 4.3, restaurant: 'A2B' },
    { id: 13, name: 'Chettinad Chicken Biriyani', img="https://th.bing.com/th/id/OIP.CO3A6Pqr-B1qdRQsvgaLpAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7",price: 260.00, orders: 0, rating: 4.5, restaurant:'Banana Leaf' },
    { id: 14, name: 'Ghee Roast Chicken Curry',img="https://th.bing.com/th/id/OIP.CtUz8EF2c4NsSgLug6HlIQHaGM?w=210&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7", price: 320.00, orders: 0, rating: 4.5, restaurant: 'Banana Leaf'},
    { id: 15, name: 'Fish Fry',img="https://th.bing.com/th/id/OIP.APmvHWlru2KHvYosM8m-6AHaHa?w=147&h=181&c=7&r=0&o=5&dpr=1.2&pid=1.7" , price: 250.00, orders: 0, rating: 4.2, restaurant: 'Banana Leaf'}
   
];
// Assuming your cart logic is already in place, now let's save the cart total for the order page.
const cartItems = [];
let totalPrice = 0;

// Toggle visibility of food list on restaurant click
document.querySelectorAll('.view-foods').forEach(button => {
    button.addEventListener('click', function () {
        const foodList = this.nextElementSibling;
        foodList.classList.toggle('hidden');
    });
});

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const foodId = this.getAttribute('data-food-id');
        const food = foodData.find(item => item.id == foodId);

        addToCart(food);
    });
});

// Add items to the cart and save to localStorage
function addToCart(food) {
    cartItems.push(food);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));  // Save the cart items in local storage
    updateCartUI();
    calculateTotal();
}

// Function to update cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (${item.restaurant}) - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(li);
    });
}

// Function to calculate total price
function calculateTotal() {
    totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));  // Save total to local storage
}

// Function to proceed to checkout
function proceedToCheckout() {
    window.location.href = "order.html";
}
