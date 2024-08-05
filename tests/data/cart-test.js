import cart from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds a new product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        cart.loadFromStorage();

        spyOn(localStorage, 'setItem');

        cart.addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9', 2);

        expect(cart.items[0].productId).toEqual(
            '3fdfe8d6-9a15-4979-b459-585b0d0545b9'
        );
        expect(cart.items[0].quantity).toEqual(2);
        expect(cart.quantity).toEqual(2);
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
        cart.loadFromStorage();

        spyOn(localStorage, 'setItem');

        cart.addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9', 6);

        expect(cart.items[0].productId).toEqual(
            '3fdfe8d6-9a15-4979-b459-585b0d0545b9'
        );
        expect(cart.items[0].quantity).toEqual(10);
        expect(cart.quantity).toEqual(10);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });
});
