import renderCheckoutHeader from './checkout/checkout-header.js';
import renderCartSummary from './checkout/cart-summary.js';
import renderPaymentSummary from './checkout/payment-summary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js';
// import '../data/car.js';

loadPage();
async function loadPage(){
    await loadProductsFetch();
    await loadCartFetch();
    renderCheckoutHeader();
    renderCartSummary();
    renderPaymentSummary(); 
}

/*
Promise.all([
    loadProductsFetch(),
    loadCartFetch(),
]).then(() => {
    renderCheckoutHeader();
    renderCartSummary();
    renderPaymentSummary();
});
*/
/*
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
*/
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
