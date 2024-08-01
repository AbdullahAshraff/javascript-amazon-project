export const cart = [];
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
}
