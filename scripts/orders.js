import { renderHeaderHTML } from './amazon-header.js';
import { renderOrderGridHTML } from './orders/order-grid.js';
import { loadProductsFetch } from '../data/products.js';

loadPage();

async function loadPage(){
    await loadProductsFetch()
    renderHeaderHTML();
    renderOrderGridHTML();
}


