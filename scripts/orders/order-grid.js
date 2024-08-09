import { orders } from "../../data/orders.js";

export function renderOrderGridHTML(){
    let html = [];

    orders.forEach(order => {
        const orderContainerHTML = `
        
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>June 10</div>
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
            <div class="product-image-container">
              <img src="images/products/intermediate-composite-basketball.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Intermediate Size Basketball
              </div>
              <div class="product-delivery-date">
                Arriving on: June 17
              </div>
              <div class="product-quantity">
                Quantity: 2
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>
        `
        html.push(orderContainerHTML);
    })
    html = html.join('');
    document.querySelector('.js-orders-grid').innerHTML = html;
}
