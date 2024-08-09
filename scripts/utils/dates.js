import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export default function getDeliveryDate(deliveryOption) {
    const deliveryDate = calcDeliveryDate(deliveryOption);
    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
}

export function calcDeliveryDate(deliveryOption) {
    const today = dayjs();
    const date = today.add(deliveryOption.deliveryDays, 'day');
    return date;
}

export function calcDeliveryDateWithWeekend(deliveryOption) {
    const today = dayjs();
    let date = today;

    for (let i = 1; i <= deliveryOption.deliveryDays; i++) {
        const nextDate = date.add(1, 'day');
        let isWeekend =
            nextDate.format('dddd') === 'Friday' ||
            nextDate.format('dddd') === 'Saturday';
        
        if (isWeekend) 
            i--;
        date = nextDate;
    }
    return date;
}

export function formatDate(date){
    const dateString = dayjs(date).format('MMMM D');
    return dateString;
}
