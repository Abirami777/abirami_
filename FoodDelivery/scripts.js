// Data for restaurants and food items
const foodData = [
    { id: 1, name: 'Margherita Pizza', price: 320.00, orders: 0, rating: 4.5, restaurant: ' Dominos Pizza ' },
    { id: 2, name: 'Chicken Pizza', price: 370.00, orders: 0, rating: 4.2, restaurant: 'Dominos Pizza ' },
    { id: 3, name: 'Veggie Fiesta', price: 190.00, orders: 0, rating: 4.2, restaurant: 'Dominos Pizza ' },
    { id: 4, name: 'Tangri Kebab', price: 820.00, orders: 0, rating: 4.7, restaurant: 'Kebab Factory' },
    { id: 5, name: 'Seekh Kebab', price: 870.00, orders: 0, rating: 4.6, restaurant: 'Kebab Factory' },
    { id: 6, name: 'Galouti Kebab', price: 930.00, orders: 0, rating: 4.3, restaurant: 'Kebab Factory' },
    { id: 7, name: 'Crispy Veg Burger', price: 80.00, orders: 0, rating: 4.5, restaurant: 'Burger King'},
    { id: 8, name: 'Crispy Chicken Burger', price: 180.00, orders: 0, rating: 4.5, restaurant: 'Burger King' },
    { id: 9, name: 'Cheese Chicken Burger', price: 210.00, orders: 0, rating: 4.2, restaurant: 'Burger King' },
    { id: 10, name: 'Mini Tiffin', price: 120.00, orders: 0, rating: 4.7, restaurant: 'A2B' },
    { id: 11, name: 'Ghee Roast', price: 120.00, orders: 0, rating: 4.6, restaurant:  'A2B' },
    { id: 12, name: 'Veg Meals', price: 220.00, orders: 0, rating: 4.3, restaurant: 'A2B' },
    { id: 13, name: 'Chettinad Chicken Biriyani', price: 260.00, orders: 0, rating: 4.5, restaurant:'Banana Leaf' },
    { id: 14, name: 'Ghee Roast Chicken Curry', price: 320.00, orders: 0, rating: 4.5, restaurant: 'Banana Leaf'},
    { id: 15, name: 'Fish Fry', price: 250.00, orders: 0, rating: 4.2, restaurant: 'Banana Leaf'}
   
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
