import {
    getAllProducts,
    getCategoriesList,
    getProductsByCategory,
  } from './js/products-api.js';
  
  import { refs } from './js/refs.js';
  import iziToast from 'izitoast';
  
  let currentPage = 1;
  let currentCategory = null;
  let allProducts = [];
  
  
  init();
  
  async function init() {
    await renderCategories();
    await loadProducts();
    setupLoadMoreButton();
  }
  
  
  async function renderCategories() {
    try {
      const categories = await getCategoriesList();
  
      refs.listCategories.innerHTML = categories
        .map(
          category => `<li><button class="category-btn">${category}</button></li>`
        )
        .join('');
  
      refs.listCategories.addEventListener('click', onCategoryClick);
    } catch (error) {
      iziToast.error({ message: 'Помилка завантаження категорій' });
    }
  }
  async function loadProducts(reset = false) {
    try {
      if (currentCategory) {
        const data = await getProductsByCategory(currentCategory);
        allProducts = data.products;
  
       
        const start = (currentPage - 1) * 12;
        const end = start + 12;
        const paginated = allProducts.slice(start, end);
  
        renderProducts(paginated);
  
        if (end >= allProducts.length) {
          refs.loadMoreBtn.style.display = 'none';
          iziToast.info({ message: 'Більше товарів немає', position: 'topRight' });
        } else {
          refs.loadMoreBtn.style.display = 'block';
        }
      } else {
        const data = await getAllProducts(currentPage);
        allProducts = [...allProducts, ...data.products];
        renderProducts(allProducts);
  
        if (allProducts.length >= data.total) {
          refs.loadMoreBtn.style.display = 'none';
          iziToast.info({ message: 'Більше товарів немає', position: 'topRight' });
        } else {
          refs.loadMoreBtn.style.display = 'block';
        }
      }
    } catch (error) {
      iziToast.error({ message: 'Помилка завантаження товарів' });
    }
  }
  
  function renderProducts(products) {
    refs.listProducts.innerHTML = products
      .map(
        product => `
      <li class="product-card">
        <h3>${product.title}</h3>
        <img src="${product.thumbnail}" alt="${product.title}" width="150" />
        <p>Price: $${product.price}</p>
      </li>
    `
      )
      .join('');
  
    refs.notFound.style.display = products.length ? 'none' : 'block';
  }
  
  function setupLoadMoreButton() {
    refs.loadMoreBtn.addEventListener('click', async () => {
      currentPage++;
      await loadProducts();
    });
  }
  

  async function onCategoryClick(e) {
    if (!e.target.classList.contains('category-btn')) return;
  
    currentPage = 1;
    currentCategory = e.target.textContent;
    allProducts = [];
  
    document
      .querySelectorAll('.category-btn')
      .forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
  
    await loadProducts(true);
  }