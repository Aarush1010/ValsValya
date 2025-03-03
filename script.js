// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    //alert('Item added to cart!');
    // Add logic to update cart here
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Debugging: Check if script.js is loaded
console.log('Script loaded!');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Debugging: Log the current cart
console.log('Current Cart:', cart);

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = {
      id: button.getAttribute('data-id'),
      name: button.getAttribute('data-name'),
      price: parseFloat(button.getAttribute('data-price')),
    };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    console.log('Product added to cart:', product); // Debugging
    updateCart();
    animateCartIcon();
  });
});

// Update Cart
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  if (cartCount) {
    cartCount.textContent = cart.length; // Update cart counter
    console.log('Cart counter updated:', cart.length); // Debugging
  }

  if (cartItems && cartTotal) {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)}</p>
      `;
      cartItems.appendChild(itemElement);
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
    console.log('Cart items updated:', cart); // Debugging
  }
}

// Animate Cart Icon
function animateCartIcon() {
  const cartIcon = document.querySelector('.fa-shopping-cart');
  if (cartIcon) {
    cartIcon.classList.add('cart-animation');
    setTimeout(() => {
      cartIcon.classList.remove('cart-animation');
    }, 500); // Remove animation after 0.5s
    console.log('Cart icon animated'); // Debugging
  }
}

// Clear Cart Functionality
const clearCartButton = document.getElementById('clear-cart-button');
if (clearCartButton) {
  clearCartButton.addEventListener('click', () => {
    cart = []; // Empty the cart array
    localStorage.removeItem('cart'); // Remove cart from localStorage
    updateCart(); // Update the cart display
    console.log('Cart cleared'); // Debugging
  });
}

// Load cart on cart.html
if (window.location.pathname.includes('cart.html')) {
  updateCart();
}