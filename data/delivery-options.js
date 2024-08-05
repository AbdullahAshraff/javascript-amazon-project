class DeliveryOption {
    id;
    deliveryDays;
    priceCents;

    constructor(optionDetails) {
        this.id = optionDetails.id;
        this.deliveryDays = optionDetails.deliveryDays;
        this.priceCents = optionDetails.priceCents;
    }
}

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: '7',
        priceCents: 0,
    },
    {
        id: '2',
        deliveryDays: '3',
        priceCents: 499,
    },
    {
        id: '3',
        deliveryDays: '1',
        priceCents: 999,
    },
].map(optionDetails => {
    return new DeliveryOption(optionDetails);
});

export function getDeliveryOption(productId) {
    return (
        deliveryOptions.find(option => productId === option.id) ||
        deliveryOptions[0]
    );
}
