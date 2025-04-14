//Робота з loacalStorage

const LS_KEY = 'basket';

const addToCart = document.querySelector('.add-to-cart');
addToCart.addEventListener('click', clickAddToCart);

function clickAddToCart(event) {
  if (!event.target.classList.contains('js-add')) {
    return;
  }
  const parent = event.target.closest('.js-product');
  const productId = Number(parent.dataset.id);
  const currentProduct = instruments.find(({ id }) => id === productId);
  const products = JSON.parse(localStorage.getItem(LS_KEY)) ?? [];

  const index = products.findIndex(({ id }) => id === productId);
  if (index === -1) {
    currentProduct.qty = 1;
    products.push(currentProduct);
  } else {
    products[index].qty += 1;
  }

  localStorage.setItem(LS_KEY, JSON.stringify(products));
}
