import {
    cart,
    removeFromCart,
    setItemQuantity,
    updateDeliveryOption,
} from '../../data/cart.js';
import {
    deliveryOptions,
    getDeliveryOption,
} from '../../data/delivery-options.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js'; 
import renderPaymentSummary from './payment-summary.js';
import renderCheckoutHeader from './checkout-header.js';
import formatDate from '../utils/dates.js';

export default function renderCartSummary() {
    let cartSummary = [];
    cart.forEach(cartItem => {
        const item = getProduct(cartItem.productId);

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        const dateString = formatDate(deliveryOption);

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
    addLinksListeners();
}

function renderDeliveryOptionsHTML(cartItem) {
    let html = [];

    deliveryOptions.forEach(deliveryOption => {
        const dateString = formatDate(deliveryOption)

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

function addLinksListeners() {
    // for delete link
    document.querySelectorAll('.js-delete-link').forEach(link => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            removeFromCart(productId);
            renderCartSummary();
            renderCheckoutHeader();
            renderPaymentSummary();
        });
    });

    // for update link
    document.querySelectorAll('.js-update-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            const container = document.querySelector(
                `.js-cart-item-container[data-product-id="${productId}"]`
            );
            container.classList.add('is-updating-quantity');
        });
    });

    // for save link
    document.querySelectorAll('.js-save-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            const quantityInput = document.querySelector(
                `.js-new-quantity-input[data-product-id="${productId}"]`
            );
            setItemQuantity(productId, parseInt(quantityInput.value));
            const container = document.querySelector(
                `.js-cart-item-container[data-product-id="${productId}"]`
            );
            container.classList.remove('is-updating-quantity');
            renderCheckoutHeader();
            renderCartSummary();
            renderPaymentSummary();
        });
    });

    // for delivery options
    document.querySelectorAll('.js-deliver-option').forEach(option => {
        option.addEventListener('click', () => {
            const { productId, deliveryOptionId } = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderCartSummary();
            renderPaymentSummary();
        });
    });
}
