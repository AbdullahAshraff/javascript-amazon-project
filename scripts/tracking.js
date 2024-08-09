import { getOrder } from '../data/orders.js';
import { getProduct } from '../data/products.js';
import { renderHeaderHTML } from './amazon-header.js';
import { loadProductsFetch } from '../data/products.js';
import { formatDateWithDay } from './utils/dates.js';

loadPage();
async function loadPage() {
    await loadProductsFetch();
    renderHeaderHTML();
    renderMainHTML();
}

function renderMainHTML() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const productItem = order.products.find(
        productItem => productItem.productId === productId
    );
    const product = getProduct(productId);

    const html = `

<div class="order-tracking">
<a class="back-to-orders-link link-primary" href="orders.html">
  View all orders
</a>

<div class="delivery-date">
  Arriving on ${formatDateWithDay(productItem.estimatedDeliveryTime)}
</div>

<div class="product-info">
  ${product.name}
</div>

<div class="product-info">
  Quantity: ${productItem.quantity}
</div>

<img class="product-image" src="${product.image}">

<div class="progress-labels-container">
  <div class="progress-label">
    Preparing
  </div>
  <div class="progress-label current-status">
    Shipped
  </div>
  <div class="progress-label">
    Delivered
  </div>
</div>

<div class="progress-bar-container">
  <div class="progress-bar"></div>
</div>
</div>
`;

    document.querySelector('.main').innerHTML = html;
}
