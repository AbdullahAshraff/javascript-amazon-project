import renderCheckoutHeader from './checkout/checkout-header.js';
import renderCartSummary from './checkout/cart-summary.js';
import renderPaymentSummary from './checkout/payment-summary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/car.js';

Promise.all([
    new Promise(resolve => {
        loadProducts(() => {
            resolve();
        });
    }),
    new Promise(resolve => {
        loadCart(() => {
            resolve();
        });
    }),
]).then(() => {
    renderCheckoutHeader();
    renderCartSummary();
    renderPaymentSummary();
});

/*
new Promise(resolve => {
    loadProducts(() => {
        resolve();
    });
})
    .then(() => {
        return new Promise(resolve => {
            loadCart(() => {
                resolve();
            });
        });
    })
    .then(() => {
        renderCheckoutHeader();
        renderCartSummary();
        renderPaymentSummary();
    });
*/
/*
loadProducts(main);
function main() {
    renderCheckoutHeader();
    renderCartSummary();
    renderPaymentSummary();
}
*/
