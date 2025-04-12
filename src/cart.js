//Логіка сторінки Cart
import axios from "axios";
import { refs } from "./js/refs";
import iziToast from "izitoast";


const cart = [2, 3, 5, 12, 2];


function getGoodsByID(id) {
    return `https://dummyjson.com/products/${id}`
};



async function fetchCart(id) {
    try {
        const links = id.map((id) => getGoodsByID(id));
        const requests = links.map((url) => axios.get(`${url}`));
        const resps = await Promise.all(requests);
        const product = resps.map(prod => prod.data);

        const markup = product.map(({ id, images, description, title, brand, category, price }) =>
            `<li class="products__item" data-id="${id}">
            <img class="products__image" src="${images[0]}" alt="${description}"/>
            <p class="products__title">${title}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
            <p class="products__category">Category: ${category} </p>
            <p class="products__price">Price: ${price} $</p>
        </li>`).join("");
        refs.listProducts.insertAdjacentHTML('beforeend', markup);

        const totalPrice = resps.map(resp => resp.data.price).reduce((acc, item) => acc + item);
        refs.totalItemsCount.textContent = cart.length;
        refs.totalItemsPrice.textContent = `$${totalPrice.toFixed(2)}`;

    }
    catch (err) {
        iziToast.error({
            message: err.message
        })
    }
}

fetchCart(cart)