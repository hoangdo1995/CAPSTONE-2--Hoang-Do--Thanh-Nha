import {callApi} from "./ApiConnector/connector.js";
import {Product} from "./Model/Product.js";



callApi('/product').then(function(result){
    console.log(result.data.content);
    let Products = result.data.content;
    let html = Products.reduce((html,product)=>{
        html += `
        <div class="product-item">
        <div class="item-container">
            <div class="item-infor">
                <a href="./pages/detail.html?id=${product.id}">
                    <div class="item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <p class="item-name">${product.name}</p>
                    <p class="item-desc">${product.shortDescription}</p>
                </a>
            </div>
            <div class="item-shopping">
                <button><a href="./pages/detail.html?id=${product.id}"><span>Buy now</span></a></button>
                <div class="item-price">
                    <p class="price">$${product.price}</p>
                </div>
            </div>
        </div>
    </div>
        `;
        return html;
    },'');
    document.querySelector('#product-body').innerHTML = html;

});