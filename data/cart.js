export let cart = getCartFromStorage();

if (!cart) {
    cart = [
        { productId: '54e0eccd-8f36-462b-b68a-8182611d9add', quantity: 2 },
        { productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', quantity: 1 },
        { productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9', quantity: 1 },
        { productId: 'aad29d11-ea98-41ee-9285-b916638cac4a', quantity: 1 },
        { productId: '5968897c-4d27-4872-89f6-5bcb052746d7', quantity: 3 },
        { productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a', quantity: 2 },
        { productId: '82bb68d7-ebc9-476a-989c-c78a40ee5cd9', quantity: 1 },
        { productId: '901eb2ca-386d-432e-82f0-6fb1ee7bf969', quantity: 1 },
        { productId: 'c2a82c5e-aff4-435f-9975-517cfaba2ece', quantity: 1 },
        { productId: 'a82c6bac-3067-4e68-a5ba-d827ac0be010', quantity: 1 },
        { productId: 'e4f64a65-1377-42bc-89a5-e572d19252e2', quantity: 1 },
    ];
}
// export let cartQuantity = 0;

export function addToCart(productId, quantity = 1) {
    let matchingItem;
    cart.forEach(item => {
        if (productId === item.productId) matchingItem = item;
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
        });
    }
    saveCartToStorage()
}

export function removeFromCart(productId) {
    const idxToRemove = cart.findIndex(item => item.productId === productId);
    cart.splice(idxToRemove, 1);
    saveCartToStorage()
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartFromStorage() {
    return JSON.parse(localStorage.getItem('cart'));
}
