import"./assets/styles-BK7AYJoX.js";import{a as $,i as g}from"./assets/vendor-CJ_tX8LA.js";import{r}from"./assets/refs-Bxw7Sh4H.js";const e=[2,3,5,12,2];function f(s){return`https://dummyjson.com/products/${s}`}async function y(s){try{const p=s.map(t=>f(t)).map(t=>$.get(`${t}`)),c=await Promise.all(p),n=c.map(t=>t.data).map(({id:t,images:a,description:d,title:m,brand:l,category:u,price:_})=>`<li class="products__item" data-id="${t}">
            <img class="products__image" src="${a[0]}" alt="${d}"/>
            <p class="products__title">${m}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${l}</span></p>
            <p class="products__category">Category: ${u} </p>
            <p class="products__price">Price: ${_} $</p>
        </li>`).join("");r.listProducts.insertAdjacentHTML("beforeend",n);const i=c.map(t=>t.data.price).reduce((t,a)=>t+a);r.totalItemsCount.textContent=e.length,r.totalItemsPrice.textContent=`$${i.toFixed(2)}`}catch(o){g.error({message:o.message})}}y(e);
//# sourceMappingURL=cart.js.map
