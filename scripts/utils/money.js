export function formatCurrency(priceCents){
    if (typeof priceCents !== 'number'){
        console.error(`price entered is not a number`);
        return;
    }
    if (priceCents >= 0)
        return (Math.round(priceCents) / 100).toFixed(2);
    else{
        return (Math.round(-priceCents) / 100).toFixed(2);
    }
};
