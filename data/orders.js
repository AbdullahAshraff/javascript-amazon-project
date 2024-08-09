import { formatCurrency } from "../scripts/utils/money.js";

class Order{
    id;
    orderTime;
    totalCostCents;
    products;

    constructor(orderDetails){
        this.id = orderDetails.id;
        this.orderTime = orderDetails.orderTime;
        this.totalCostCents = orderDetails.totalCostCents;
        this.products = orderDetails.products;
    }

    getPrice() {
        return `$${formatCurrency(this.totalCostCents)}`;
    }
}

export function addOrder(orderDetails){
    orders.unshift(new Order(orderDetails));
    saveToLocalStorage();
}

export function getOrder(orderId){
    return orders.find( order => order.id === orderId );
}

function saveToLocalStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

function loadOrdersFromStorage(){
    const ordersData = JSON.parse(localStorage.getItem('orders')) || [];
    orders = ordersData.map(orderDetails => new Order(orderDetails));
}
export let orders = [];
loadOrdersFromStorage();
