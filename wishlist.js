import"./assets/styles-BK7AYJoX.js";import{a as n}from"./assets/vendor-CJ_tX8LA.js";import{r as d}from"./assets/refs-Bxw7Sh4H.js";async function i(s){try{return(await n.get(`https://dummyjson.com/products/${s}`)).data}catch(r){alert(r.message)}}const l=[1,8,24];Promise.all(l.map(s=>i(Number(s)))).then(s=>{d.listProducts.insertAdjacentHTML("beforeend",m(s))}).catch(s=>s.message);function m(s){return s.map(({id:r,images:t,description:a,title:c,brand:e,category:o,price:p})=>`<li class="products__item" data-id="${r}">
            <img class="products__image" src="${String(t)}" alt="${a}"/>
            <p class="products__title">${c}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${e}</span></p>
            <p class="products__category">Category: ${o} </p>
            <p class="products__price">Price: ${p} $</p>
        </li>`).join("")}
//# sourceMappingURL=wishlist.js.map
