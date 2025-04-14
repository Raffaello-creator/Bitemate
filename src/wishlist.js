//Логіка сторінки Wishlist

import { getProductById } from './js/products-api';
import { refs } from './js/refs';
// import { renderCart } from './js/render-function';  // //? заглушка. Убрать комментарий после написания render-function.js

// const wishlistProducts = JSON.parse(localStorage.getItem(wishlist)) || [];  // //? Убрать комментарий после написания render-function.js

const wishlistProducts = [1, 8, 24]; // //? заглушка. Убрать после написания render-function.js

Promise.all(wishlistProducts.map(item => getProductById(Number(item))))
  .then(response => {
    refs.listProducts.insertAdjacentHTML('beforeend', renderCart(response));
  })
  .catch(error => error.message);

// //? ======================================================= заглушка. Убрать после написания render-function.js

function renderCart(array) {
  return array
    .map(
      ({ id, images, description, title, brand, category, price }) =>
        `<li class="products__item" data-id="${id}">
            <img class="products__image" src="${String(
              images
            )}" alt="${description}"/>
            <p class="products__title">${title}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
            <p class="products__category">Category: ${category} </p>
            <p class="products__price">Price: ${price} $</p>
        </li>`
    )
    .join('');
}
