export let orders = [];
loadOrdersFromStorage();
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
    orders = JSON.parse(localStorage.getItem('orders')) || [];
}
