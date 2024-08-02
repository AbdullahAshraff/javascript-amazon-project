import {
    addToCart,
    cart,
    cartQuantity,
    loadCartFromStorage,
    loadCartQuantityFromStorage,
} from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds a new product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadCartFromStorage();
        loadCartQuantityFromStorage();

        spyOn(localStorage, 'setItem');

        addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9', 2);

        expect(cart[0].productId).toEqual(
            '3fdfe8d6-9a15-4979-b459-585b0d0545b9'
        );
        expect(cart[0].quantity).toEqual(2);
        expect(cartQuantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });


    it('adds an existing product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId:'3fdfe8d6-9a15-4979-b459-585b0d0545b9',
                quantity:4,
                deliveryOption:'1',
            }]);
        });

        loadCartFromStorage();
        loadCartQuantityFromStorage();

        spyOn(localStorage, 'setItem');

        addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9', 6);

        expect(cart[0].productId).toEqual(
            '3fdfe8d6-9a15-4979-b459-585b0d0545b9'
        );
        expect(cart[0].quantity).toEqual(10);
        expect(cartQuantity).toEqual(10);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });

});

