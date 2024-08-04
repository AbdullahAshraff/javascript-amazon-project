import {
    cart,
    loadCartFromStorage,
    loadCartQuantityFromStorage,
} from '../../data/cart-old.js';
import { getProduct } from '../../data/products.js';
import renderCartSummary from '../../scripts/checkout/cart-summary.js';

describe('test suite: renderCartSummary', () => {
    const cartToTest = [
        {
            productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
            quantity: 2,
            deliveryOptionId: '1',
        },
        {
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 1,
            deliveryOptionId: '1',
        },
        {
            productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
            quantity: 1,
            deliveryOptionId: '3',
        },
        {
            productId: 'aad29d11-ea98-41ee-9285-b916638cac4a',
            quantity: 1,
            deliveryOptionId: '2',
        },
        {
            productId: '5968897c-4d27-4872-89f6-5bcb052746d7',
            quantity: 3,
            deliveryOptionId: '1',
        },
    ];

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-tests-container').innerHTML = ` 
            <div class="js-order-summary"></div>
            <div class="js-checkout-header"></div>
            <div class="js-payment-summary"></div>
        `;
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(cartToTest);
        });

        loadCartFromStorage();
        loadCartQuantityFromStorage();

        renderCartSummary();
    });
    afterEach(() => {
        document.querySelector('.js-tests-container').innerHTML = ``;
    });

    it('displays the cart properly', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(cartToTest.length);

        for (let i = 0; i < cartToTest.length; i++) {
            expect(
                document.querySelector(
                    `.js-cart-item-container[data-product-id="${cartToTest[i].productId}"] .js-quantity-label`
                ).textContent
            ).toEqual(`${cartToTest[i].quantity}`);
        }
    });
    it('displays the products names properly', () => {
        for (let i = 0; i < cartToTest.length; i++) {
            expect(
                document.querySelector(
                    `.js-cart-item-container[data-product-id="${cartToTest[i].productId}"] .product-name`
                ).innerText
            ).toBe(getProduct(cartToTest[i].productId).name);
        }
    });
    it('displays the prices with $ at the beginning', () => {
        for (let i = 0; i < cartToTest.length; i++) {
            expect(
                document
                    .querySelector(
                        `.js-cart-item-container[data-product-id="${cartToTest[i].productId}"] .product-price`
                    )
                    .innerText.startsWith('$')
            ).toBe(true);
        }
    });

    it('removes a product when clicking delete', () => {
        document
            .querySelector(
                `.js-cart-item-container[data-product-id="${cartToTest[0].productId}"] .js-delete-link`
            )
            .click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(cartToTest.length - 1);

        expect(
            document.querySelector(
                `.js-cart-item-container[data-product-id="${cartToTest[0].productId}"]`
            )
        ).toEqual(null);

        for (let i = 1; i < cartToTest.length; i++) {
            expect(
                document.querySelector(
                    `.js-cart-item-container[data-product-id="${cartToTest[i].productId}"]`
                )
            ).not.toEqual(null);
        }

        expect(cart.length).toEqual(cartToTest.length - 1);
        expect(cart).toEqual(cartToTest.slice(1));
    });
});
