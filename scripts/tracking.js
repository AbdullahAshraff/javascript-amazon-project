import { getOrder } from '../data/orders.js';
import { getProduct } from '../data/products.js';
import { renderHeaderHTML } from './amazon-header.js';
import { loadProductsFetch } from '../data/products.js';
import { formatDateWithDay, getDeliveryProgress } from './utils/dates.js';

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
    const productItem = order.getProduct(productId);
    const product = getProduct(productId);

    const progress = getDeliveryProgress(
        order.orderTime,
        productItem.estimatedDeliveryTime
    );

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
  <div class="progress-label js-progress-label">
    Preparing
  </div>
  <div class="progress-label js-progress-label">
    Shipped
  </div>
  <div class="progress-label js-progress-label">
    Delivered
  </div>
</div>

<div class="progress-bar-container">
  <div class="progress-bar js-progress-bar"></div>
</div>
</div>
`;
    document.querySelector('.main').innerHTML = html;
    showProgress(progress);
}

function showProgress(progress) {
    
    let progressStatusIdx = 0;
    if (progress < 49) progressStatusIdx = 0;
    else if (progress <= 99) progressStatusIdx = 1;
    else progressStatusIdx = 2;

    let progressWidth;
    if (progress < 5) progressWidth = 5;
    else if (95 < progress < 100) progressWidth = 95;
    else progressWidth = progress;

    document
        .querySelectorAll('.js-progress-label')
        [progressStatusIdx].classList.add('current-status');

    document.querySelector(
        '.js-progress-bar'
    ).style.width = `${progressWidth}%`;
}
