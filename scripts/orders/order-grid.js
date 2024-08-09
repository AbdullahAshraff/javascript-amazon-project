import { orders } from '../../data/orders.js';
import { getProduct } from '../../data/products.js';
import { formatDate } from '../utils/dates.js';
import cart from '../../data/cart.js';
import { renderHeaderHTML } from '../amazon-header.js';

export function renderOrderGridHTML() {
    let html = [];

    orders.forEach(order => {
        const orderContainerHTML = `
        
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${order.getPrice()}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
              ${getOrderDetailsHTML(order)}
          </div>
        </div>
        `;
        html.push(orderContainerHTML);
    });
    html = html.join('');
    document.querySelector('.js-orders-grid').innerHTML = html;

    document.querySelectorAll('.js-buy-again-button').forEach(button => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            cart.addToCart(productId);
            renderHeaderHTML();
            showAdded(button);
        });
    });
}

function getOrderDetailsHTML(order) {
    let productsHTML = [];

    order.products.forEach(productItem => {
        const product = getProduct(productItem.productId);
        const singleProductHTML = `
            <div class="product-image-container">
                <img src="${product.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                ${product.name}
                </div>
                <div class="product-delivery-date">
                Arriving on: ${formatDate(productItem.estimatedDeliveryTime)}
                </div>
                <div class="product-quantity">
                Quantity: ${productItem.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${
                    product.id
                }">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                <span class="buy-again-success"> ✓ Added </span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
                </a>
            </div>
        `;
        productsHTML.push(singleProductHTML);
    });
    productsHTML = productsHTML.join('');
    return productsHTML;
}

function showAdded(button) {
  button.classList.add('show-added');

    // retrieve last timeout id from the html dataset
    let lastTimeoutId = parseInt(button.dataset.lastTimeoutId);
    if (lastTimeoutId) clearTimeout(lastTimeoutId);
    button.dataset.lastTimeoutId = setTimeout(() => {
      button.classList.remove('show-added');
    }, 2000);
}
