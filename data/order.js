import { cart } from './cart-old.js';
import { getProduct } from './products.js';
import { getDeliveryOption } from './delivery-options.js';

export function generateOrderPayment() {
    let order = {
        quantity: 0,
        itemsCostCents: 0,
        deliveryCostCents: 0,
        totalBeforeTax: 0,
        tax: 0,
        totalAfterTax: 0,
    };
    cart.forEach(cartItem => {
        const item = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        order.quantity += cartItem.quantity;
        order.itemsCostCents += item.priceCents * cartItem.quantity;
        order.deliveryCostCents += deliveryOption.priceCents;
    });

    order.totalBeforeTax = order.itemsCostCents + order.deliveryCostCents;
    order.tax = order.totalBeforeTax * 0.1;
    order.totalAfterTax = order.totalBeforeTax + order.tax;
    return order;
}
