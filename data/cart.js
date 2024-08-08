class Cart {
    items;
    quantity;
    #cartItemsLSKey;
    #cartQuantityLSKey;

    constructor(cartItemsLSKey, cartQuantityLSKey) {
        this.#cartItemsLSKey = cartItemsLSKey;
        this.#cartQuantityLSKey = cartQuantityLSKey;
        this.loadFromStorage();
    }

    addToCart(productId, quantityIncrement = 1) {
        if (!productId) {
            console.error('wrong value was passed to addToCart as a productId');
            return;
        }
        let matchingItem = this.items.find(
            item => productId === item.productId
        );

        if (matchingItem) {
            matchingItem.quantity += quantityIncrement;
        } else {
            this.items.push({
                productId,
                quantity: quantityIncrement,
                deliveryOptionId: '1',
            });
        }
        this.#saveItemsToStorage();
        this.#calcQuantity();
    }

    setItemQuantity(productId, quantity = undefined) {
        let matchingItem = this.items.find(
            item => productId === item.productId
        );

        if (matchingItem) {
            matchingItem.quantity = quantity;
        } else {
            this.addToCart(productId, quantity);
        }
        this.#saveItemsToStorage();
        this.#calcQuantity();
    }

    removeFromCart(productId) {
        const idxToRemove = this.items.findIndex(
            item => item.productId === productId
        );
        if (idxToRemove >= 0) this.items.splice(idxToRemove, 1);
        this.#saveItemsToStorage();
        this.#calcQuantity();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        const cartItem = this.items.find(
            item => item.productId === productId
        );
        cartItem.deliveryOptionId = deliveryOptionId;
        this.#saveItemsToStorage();
    }

    loadFromStorage() {
        this.#loadItemsFromStorage();
        this.#loadQuantityFromStorage();
    }

    #saveItemsToStorage() {
        localStorage.setItem(
            this.#cartItemsLSKey,
            JSON.stringify(this.items)
        );
    }

    #loadItemsFromStorage() {
        this.items = localStorage.getItem(this.#cartItemsLSKey);
        if (this.items) this.items = JSON.parse(this.items);
        else {
            this.items = [
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
            ];
        }
    }

    #calcQuantity() {
        let countCartQuantity = 0;
        this.items.forEach(item => {
            countCartQuantity += item.quantity;
        });
        this.quantity = countCartQuantity;
        localStorage.setItem(this.#cartQuantityLSKey, this.quantity);
    }

    #loadQuantityFromStorage() {
        this.quantity = parseInt(
            localStorage.getItem(this.#cartQuantityLSKey)
        );
        if (!this.quantity) {
            this.#calcQuantity();
        }
    }
}

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response)
        fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}


const cart = new Cart('cartClass', 'cartQuantityClass');
export default cart;

/*
const normalCart = new Cart('normal-cart-class', 'normal-cartQuantity-class');
const businessCart = new Cart(
    'business-cart-class',
    'business-cartQuantity-class'
);

normalCart.removeFromCart('54e0eccd-8f36-462b-b68a-8182611d9add');
console.log(`normalCart`);
console.log(normalCart);
businessCart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
console.log(`businessCart`);
console.log(businessCart);
*/
