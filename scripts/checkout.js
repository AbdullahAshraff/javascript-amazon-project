import {
    cart,
    cartQuantity,
    removeFromCart,
    setItemQuantity,
    updateDeliveryOption,
} from '../data/cart.js';
import { deliveryOptions } from '../data/delivery-options.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

renderCartSummary();
document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;
        removeFromCart(productId);
        removeItemFromHTML(productId);
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
        setItemQuantityHTML(productId, parseInt(quantityInput.value));
        const container = document.querySelector(
            `.js-cart-item-container[data-product-id="${productId}"]`
        );
        container.classList.remove('is-updating-quantity');
    });
});

function renderCartSummary() {
    let cartSummary = [];
    const today = dayjs();
    cart.forEach(cartItem => {
        const item = products.find(item => item.id === cartItem.productId);
        const selectedOption = deliveryOptions.find(
            option => option.id === cartItem.deliveryOptionId
        );
        const deliveryDate = today.add(selectedOption.deliveryDays, 'day');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const cartItemHTML = `
             <div class="cart-item-container js-cart-item-container" data-product-id="${
                 item.id
             }">
                <div class="delivery-date">
                  Delivery date: ${dateString}
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
                        Quantity: <span class="quantity-label js-quantity-label" data-product-id="${
                            item.id
                        }">${cartItem.quantity}</span>
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
                    ${renderDeliveryOptionsHTML(cartItem)}
                  </div>
                </div>
              </div>
              `;

        cartSummary.push(cartItemHTML);
    });

    cartSummary = cartSummary.join('');

    document.querySelector('.order-summary').innerHTML = cartSummary;
    updateCartQuantityHTML();

    document.querySelectorAll('.js-deliver-option').forEach(option => {
        option.addEventListener('click', () => {
            const { productId, deliveryOptionId } = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderCartSummary();
        });
    });
}

function renderDeliveryOptionsHTML(cartItem) {
    const today = dayjs();
    let html = [];

    deliveryOptions.forEach(deliveryOption => {
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString =
            deliveryOption.priceCents === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

        const optionHTML = `
        <div class="delivery-option js-deliver-option" data-product-id="${
            cartItem.productId
        }" data-delivery-option-id = ${deliveryOption.id}
        >
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${cartItem.productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`;
        html.push(optionHTML);
    });

    return html.join('');
}

function updateCartQuantityHTML() {
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function removeItemFromHTML(productId) {
    document
        .querySelector(`.cart-item-container[data-product-id="${productId}"]`)
        .remove();
    updateCartQuantityHTML();
}

function setItemQuantityHTML(productId, quantity) {
    const label = document.querySelector(
        `.js-quantity-label[data-product-id="${productId}"]`
    );
    label.textContent = quantity;
    updateCartQuantityHTML();
}
