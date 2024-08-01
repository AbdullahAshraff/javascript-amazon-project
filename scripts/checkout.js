import {
    cart,
    cartQuantity,
    removeFromCart,
    setItemQuantity,
} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

renderCartSummary();
document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;
        removeFromCart(productId);
        removeFromHTML(productId);
    });
});

document.querySelectorAll('.js-update-quantity-link').forEach(link => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;
        const container = document.querySelector(
            `.js-cart-item-container[data-product-id="${productId}"]`
        );
        container.classList.add('is-updating-quantity');
    });
});

document.querySelectorAll('.js-save-quantity-link').forEach(link => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;
        const quantityInput = document.querySelector(
            `.js-new-quantity-input[data-product-id="${productId}"]`
        );
        setItemQuantity(productId, parseInt(quantityInput.value));
        setItemQuantityHTML(productId, parseInt(quantityInput.value))
        const container = document.querySelector(
            `.js-cart-item-container[data-product-id="${productId}"]`
        );
        container.classList.remove('is-updating-quantity');
    });
});

function renderCartSummary() {
    let cartSummary = [];
    cart.forEach(cartItem => {
        const item = products.find(item => item.id === cartItem.productId);
        const cartItemHTML = `
             <div class="cart-item-container js-cart-item-container" data-product-id="${
                 item.id
             }">
                <div class="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${item.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${item.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(item.priceCents)}
                    </div>
                    <div class="product-quantity js-product-quantity">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label" data-product-id="${item.id}">${
                            cartItem.quantity
                        }</span>
                      </span>
                      <input class="js-new-quantity-input new-quantity-input" type="number" value="${
                          cartItem.quantity
                      }" data-product-id="${item.id}">
                      <span class="link-primary save-quantity-link js-save-quantity-link" data-product-id="${
                          item.id
                      }">
                        Save
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                          item.id
                      }">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                          item.id
                      }">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                      <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${item.id}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${item.id}">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${item.id}">
                      <div>
                        <div class="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `;
        cartSummary.push(cartItemHTML);
    });

    cartSummary = cartSummary.join('');

    document.querySelector('.order-summary').innerHTML = cartSummary;
    updateCartQuantityHTML();
}

function updateCartQuantityHTML() {
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function removeFromHTML(productId) {
    document
        .querySelector(`.cart-item-container[data-product-id="${productId}"]`)
        .remove();
    updateCartQuantityHTML();
}

function setItemQuantityHTML(productId, quantity){
  const label = document.querySelector( `.js-quantity-label[data-product-id="${productId}"]`);
  label.textContent = quantity;
  updateCartQuantityHTML()
}
