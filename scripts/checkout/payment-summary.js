import { formatCurrency } from '../utils/money.js';
import { generateOrderPayment } from '../../data/orderPayment.js';
import cart from '../../data/cart.js';
import { addOrder } from '../../data/orders.js';

export default function renderPaymentSummary() {
    const order = generateOrderPayment();

    const html = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${order.quantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(
                order.itemsCostCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
                order.deliveryCostCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
                order.totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
                order.tax
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
                order.totalAfterTax
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = html;

    document
        .querySelector('.js-place-order-button')
        .addEventListener('click', async () => {
          try{
            const response = await fetch(
                'https://supersimplebackend.dev/orders',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        cart: cart.items,
                    }),
                }
            );
            if (!response.ok) throw 'There is a problem 324.';
            addOrder( await response.json());
            cart.clear();
            window.location.href = 'orders.html';
          } catch (error){
            console.error('Something wrong happened. Order has not been sent! Check your connection and try again.')
          }
        });
}
