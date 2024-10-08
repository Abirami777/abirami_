// Data for restaurants and food items
const foodData = [
    { id: 1, name: 'Margherita Pizza', price: 320.00, orders: 0, rating: 4.5, restaurant: ' Dominos Pizza ' },
    { id: 2, name: 'Chicken Pizza', price: 370.00, orders: 0, rating: 4.2, restaurant: 'Dominos Pizza ' },
    { id: 3, name: 'Veggie Fiesta', price: 190.00, orders: 0, rating: 4.2, restaurant: 'Dominos Pizza ' },
    { id: 4, name: 'Salmon Sushi', price: 10.00, orders: 0, rating: 4.7, restaurant: 'Sushi World' },
    { id: 4, name: 'Tuna Sushi', price: 12.00, orders: 0, rating: 4.6, restaurant: 'Sushi World' },
    { id: 5, name: 'Classic Burger', price: 8.00, orders: 0, rating: 4.3, restaurant: 'Burger Town' },
    { id: 6, name: 'Cheese Burger', price: 9.00, orders: 0, rating: 4.5, restaurant: 'Burger Town' },
    { id: 1, name: 'Margherita Pizza', price: 12.00, orders: 0, rating: 4.5, restaurant: 'Pizza Palace' },
    { id: 2, name: 'Pepperoni Pizza', price: 15.00, orders: 0, rating: 4.2, restaurant: 'Pizza Palace' },
    { id: 3, name: 'Salmon Sushi', price: 10.00, orders: 0, rating: 4.7, restaurant: 'Sushi World' },
    { id: 4, name: 'Tuna Sushi', price: 12.00, orders: 0, rating: 4.6, restaurant: 'Sushi World' },
    { id: 5, name: 'Classic Burger', price: 8.00, orders: 0, rating: 4.3, restaurant: 'Burger Town' },
    { id: 6, name: 'Cheese Burger', price: 9.00, orders: 0, rating: 4.5, restaurant: 'Burger Town' },
    { id: 1, name: 'Margherita Pizza', price: 12.00, orders: 0, rating: 4.5, restaurant: 'Pizza Palace' },
    { id: 2, name: 'Pepperoni Pizza', price: 15.00, orders: 0, rating: 4.2, restaurant: 'Pizza Palace' },
    { id: 3, name: 'Salmon Sushi', price: 10.00, orders: 0, rating: 4.7, restaurant: 'Sushi World' },
    { id: 4, name: 'Tuna Sushi', price: 12.00, orders: 0, rating: 4.6, restaurant: 'Sushi World' },
    { id: 5, name: 'Classic Burger', price: 8.00, orders: 0, rating: 4.3, restaurant: 'Burger Town' },
    { id: 6, name: 'Cheese Burger', price: 9.00, orders: 0, rating: 4.5, restaurant: 'Burger Town' }
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
