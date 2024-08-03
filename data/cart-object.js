function Cart(localStorageCart, localStorageCartQuantity) {
    const cart = {
        cartList: undefined,
        cartQuantity: undefined,

        addToCart(productId, quantityIncrement = 1) {
            if (!productId){
                console.error('wrong value was passed to addToCart as a productId');
                return;
            }
            let matchingItem = this.cartList.find(
                item => productId === item.productId
            );

            if (matchingItem) {
                matchingItem.quantity += quantityIncrement;
            } else {
                this.cartList.push({
                    productId,
                    quantity: quantityIncrement,
                    deliveryOptionId: '1',
                });
            }
            this.saveCartToStorage();
            this.updateCartQuantity();
        },

        setItemQuantity(productId, quantity = undefined) {
            let matchingItem = this.cartList.find(
                item => productId === item.productId
            );

            if (matchingItem) {
                matchingItem.quantity = quantity;
            } else {
                this.addToCart(productId, quantity);
            }
            this.saveCartToStorage();
            this.updateCartQuantity();
        },

        removeFromCart(productId) {
            const idxToRemove = this.cartList.findIndex(
                item => item.productId === productId
            );
            if (idxToRemove >= 0) this.cartList.splice(idxToRemove, 1);
            this.saveCartToStorage();
            this.updateCartQuantity();
        },

        saveCartToStorage() {
            localStorage.setItem(localStorageCart, JSON.stringify(this.cartList));
        },

        loadCartFromStorage() {
            this.cartList = localStorage.getItem(localStorageCart);
            if (this.cartList) this.cartList = JSON.parse(this.cartList);
            else {
                this.cartList = [
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
                    {
                        productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
                        quantity: 2,
                        deliveryOptionId: '2',
                    },
                    {
                        productId: '82bb68d7-ebc9-476a-989c-c78a40ee5cd9',
                        quantity: 1,
                        deliveryOptionId: '1',
                    },
                    {
                        productId: '901eb2ca-386d-432e-82f0-6fb1ee7bf969',
                        quantity: 1,
                        deliveryOptionId: '3',
                    },
                    {
                        productId: 'c2a82c5e-aff4-435f-9975-517cfaba2ece',
                        quantity: 1,
                        deliveryOptionId: '2',
                    },
                    {
                        productId: 'a82c6bac-3067-4e68-a5ba-d827ac0be010',
                        quantity: 1,
                        deliveryOptionId: '2',
                    },
                    {
                        productId: 'e4f64a65-1377-42bc-89a5-e572d19252e2',
                        quantity: 1,
                        deliveryOptionId: '3',
                    },
                ];
            }
        },

        updateCartQuantity() {
            let countCartQuantity = 0;
            this.cartList.forEach(item => {
                countCartQuantity += item.quantity;
            });
            this.cartQuantity = countCartQuantity;
            localStorage.setItem(localStorageCartQuantity, this.cartQuantity);
        },

        loadCartQuantityFromStorage() {
            this.cartQuantity = parseInt(
                localStorage.getItem(localStorageCartQuantity)
            );
            if (!this.cartQuantity) {
                this.updateCartQuantity();
            }
        },

        updateDeliveryOption(productId, deliveryOptionId) {
            const cartItem = this.cartList.find(
                item => item.productId === productId
            );
            cartItem.deliveryOptionId = deliveryOptionId;
            this.saveCartToStorage();
        },
    };
    return cart;
}

const normalCart = Cart('cart-oop','cartQuantity-oop');
const businessCart = Cart('bcart-oop','bcartQuantity-oop');



normalCart.loadCartFromStorage();
businessCart.loadCartFromStorage();

normalCart.loadCartQuantityFromStorage();
businessCart.loadCartQuantityFromStorage();


businessCart.removeFromCart("aad29d11-ea98-41ee-9285-b916638cac4a");

normalCart.setItemQuantity("aad29d11-ea98-41ee-9285-b916638cac4a",3);

console.log(normalCart.cartList);
console.log(normalCart.cartQuantity);
console.log(businessCart.cartList);
console.log(businessCart.cartQuantity);
