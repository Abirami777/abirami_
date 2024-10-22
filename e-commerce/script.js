let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to display products on the buy page
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (products.length === 0) {
        productList.innerHTML = '<p>No products available.</p>';
        return;
    }

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="proceedToOrder(${index})">Order Now</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to save a new product
function saveProduct(product) {
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product listed successfully!');
    document.getElementById('sell-form').reset();
}

// Handle product selling form submission
document.getElementById('sell-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const product = {
        name: document.getElementById('product-name').value,
        price: parseFloat(document.getElementById('product-price').value),
        description: document.getElementById('product-description').value,
        seller: {
            name: document.getElementById('seller-name').value,
            contact: document.getElementById('seller-contact').value
        }
    };

    const fileInput = document.getElementById('product-image');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            product.image = e.target.result; // Set the image data URL
            saveProduct(product);
        };
        reader.readAsDataURL(file);
    }
});

// Load cart items from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = 0;

// Function to update the cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
        document.getElementById('total-price').textContent = '0.00';
        return;
    }

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(li);
    });

    calculateTotal();
}

// Function to calculate total price
function calculateTotal() {
    totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Function to update quantity
function updateQuantity(index, change) {
    cartItems[index].quantity = Math.max(1, cartItems[index].quantity + change);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
}

// Function to remove item from cart
function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
}

// Function to proceed to checkout
function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    window.location.href = "order.html"; // Redirect to order page
}

// Initialize the cart UI on page load
updateCartUI();
  // Function to display products from localStorage
        function displayProducts() {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            // Check if products exist
            if (products.length === 0) {
                productList.innerHTML = '<p>No products available.</p>';
                return;
            }

            products.forEach((product, index) => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product'; // Add a class for styling
                productDiv.innerHTML = `
                    <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>Price: ₹${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                    <button onclick="addToCart(${index})">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        }

        function addToCart(index) {
            const products = JSON.parse(localStorage.getItem('products'));
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            if (!products[index]) {
                alert('Product not found!');
                return;
            }

            const product = { ...products[index], quantity: 1 };
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert('Product added to cart!');
        }

        displayProducts(); // Call the function to display products on page load


// Function to handle order details
function proceedToOrder(index) {
    localStorage.setItem('selectedProduct', JSON.stringify(products[index]));
    window.location.href = "order.html"; // Redirect to order page
}

// Handle order details form submission
document.getElementById('delivery-form')?.onsubmit = function(event) {
    event.preventDefault();
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        const customerDetails = {
            name: document.getElementById('customerName').value,
            address: document.getElementById('customerAddress').value,
            contact: document.getElementById('customerContact').value
        };

        alert(`Order placed for: ${selectedProduct.name}\nCustomer Details: ${JSON.stringify(customerDetails)}`);
        localStorage.removeItem('selectedProduct'); // Clear the selected product
        this.reset();
    }
};

// Initialize the appropriate page functions
if (document.getElementById('product-list')) {
    displayProducts();
}
