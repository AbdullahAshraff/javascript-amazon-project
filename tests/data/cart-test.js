import cartInstance from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
    it('adds a new product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        cartInstance.loadFromStorage();

        spyOn(localStorage, 'setItem');

        cartInstance.addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9', 2);

        expect(cartInstance.cartItems[0].productId).toEqual(
            '3fdfe8d6-9a15-4979-b459-585b0d0545b9'
        );
        expect(cartInstance.cartItems[0].quantity).toEqual(2);
        expect(cartInstance.cartQuantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        /* expect(localStorage.setItem)
            .toHaveBeenCalledWith(
                'cart',
                JSON.stringify([
                    {
                        productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
                        quantity: 2,
                        deliveryOptionId: "1",
                    },
                ])
            )
        expect(localStorage.setItem).toHaveBeenCalledWith('cartQuantity', 2);
        */
    });

    it('adds an existing product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
                    quantity: 4,
                    deliveryOption: '1',
                },
            ]);
        });
        cartInstance.loadFromStorage();

        spyOn(localStorage, 'setItem');

        cartInstance.addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9', 6);

        expect(cartInstance.cartItems[0].productId).toEqual(
            '3fdfe8d6-9a15-4979-b459-585b0d0545b9'
        );
        expect(cartInstance.cartItems[0].quantity).toEqual(10);
        expect(cartInstance.cartQuantity).toEqual(10);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });
});
