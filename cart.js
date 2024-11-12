// Shopping cart and wishlist management
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.updateCartCount();
        this.updateWishlistCount();
    }

    addToCart(product) {
        this.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        return this.cart.length;
    }

    addToWishlist(product) {
        // Check if product already exists in wishlist
        const exists = this.wishlist.some(item => 
            item.name === product.name && item.color === product.color
        );

        if (!exists) {
            this.wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
            this.updateWishlistCount();
            return true;
        }
        return false;
    }

    updateCartCount() {
        const cartIcons = document.querySelectorAll('.fa-shopping-bag');
        cartIcons.forEach(icon => {
            // Add cart count bubble if it doesn't exist
            let countBubble = icon.nextElementSibling;
            if (!countBubble || !countBubble.classList.contains('count-bubble')) {
                countBubble = document.createElement('span');
                countBubble.classList.add('count-bubble');
                icon.parentNode.appendChild(countBubble);
            }
            countBubble.textContent = this.cart.length;
            countBubble.style.display = this.cart.length > 0 ? 'block' : 'none';
        });
    }

    updateWishlistCount() {
        const wishlistIcons = document.querySelectorAll('.fa-heart');
        wishlistIcons.forEach(icon => {
            // Add wishlist count bubble if it doesn't exist
            let countBubble = icon.nextElementSibling;
            if (!countBubble || !countBubble.classList.contains('count-bubble')) {
                countBubble = document.createElement('span');
                countBubble.classList.add('count-bubble');
                icon.parentNode.appendChild(countBubble);
            }
            countBubble.textContent = this.wishlist.length;
            countBubble.style.display = this.wishlist.length > 0 ? 'block' : 'none';
        });
    }
}

// Initialize shopping cart
const shoppingCart = new ShoppingCart(); 