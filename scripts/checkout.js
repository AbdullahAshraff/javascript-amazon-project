import renderCheckoutHeader from './checkout/checkout-header.js';
import renderCartSummary from './checkout/cart-summary.js';
import renderPaymentSummary from './checkout/payment-summary.js';
import { loadProducts } from '../data/products.js';
// import '../data/car.js';

loadProducts(main)
function main(){
renderCheckoutHeader();
renderCartSummary();
renderPaymentSummary();
}
