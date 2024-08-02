import { formatCurrency } from '../utils/money.js';
import { generateOrderPayment } from '../../data/order.js';

export default function renderPaymentSummary() {
    const order = generateOrderPayment()

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

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = html;
}
