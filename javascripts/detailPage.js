import {
    callApi
} from "./ApiConnector/connector.js";
import {
    Product
} from "./Model/Product.js";

import {getCardStorange,setCardStorange } from "./Controller/StorangeController.js";

let cardList = getCardStorange();
window.productNow = new Product();
productNow.amount = 1;
productNow.size =['38'];

callApi('/product').then(function (result) {
    console.log(result.data.content);
    let Products = result.data.content;
    let html = Products.reduce((html, product) => {
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
    }, '');
    document.querySelector('#product-body').innerHTML = html;

    function getProductId() {
        var id = 0;
        console.log(window.location.href);
        var href = window.location.href.split("=");
        id = href[href.length - 1]
        console.log(id);
        if (Number.isInteger(+id) && id > 0) {
            return id;
        }

        return 1;
    }



    function postProductDetails(prod) {
        console.log(prod.data.content);
        var product = prod.data.content;
        productNow = {...productNow,...product};
        console.log('productNow',productNow);
        var productImg = `<img src="${product.image}" alt="${product.alias}">`;
        var productInfor = `<h1>${product.name}</h1>
                        <p>${product.description}</p>`;
        var productPrice = `<p>${product.price}<span>$</span></p>`;
        document.querySelector(".product .product-image").innerHTML = productImg;
        document.querySelector(".product .product-detail .product-descriptions").innerHTML = productInfor;
        document.querySelector(".product .product-detail .product-price").innerHTML = productPrice;
    }

    function postRelatedProduct(prod) {
        var productList = prod.data.content.relatedProducts;
        var relatedProduct = '';
        for (var i = 0; i < productList.length; i++) {
            var product = productList[i];
            relatedProduct +=
                `<div class="product-item">
            <div class="item-container">
                <div class="item-infor">
                    <a href="/pages/detail.html?id=${product.id}" onclick="getProductId()">
                        <div class="item-image">
                            <img src="${product.image}" alt="${product.alias}">
                        </div>
                        <p class="item-name">${product.name}</p>
                        <p class="item-desc">${product.description}</p>
                    </a>
                </div>
                <div class="item-shopping">
                    <button><a href="./shoppingCart.html"><span>Buy now</span></a></button>
                    <div class="item-price">
                        <p class="price">$${product.price}</p>
                    </div>
                </div>
            </div>
        </div>`;
        }
        document.querySelector("#product-body").innerHTML = relatedProduct;
    }


    function renderUI(id) {
        var promise = callApi(`/Product/getbyid?id=${id}`);

        promise.then((prod) => {
            postProductDetails(prod);
            postRelatedProduct(prod);
        })
    }

    renderUI(getProductId());
});

window.onload = () =>{
    let listSize = document.querySelectorAll('.product-size p')
    console.log(listSize);
    listSize.forEach(p =>{
        p.onclick = (e)=>{
            console.log(e.target.innerHTML);
            let sizeNow = e.target.innerHTML;
            productNow.size = [];
            productNow.size.push(sizeNow);
            
        }
    });
    document.querySelector('.plus').onclick = ()=>{
        productNow.amount += 1;
        document.querySelector('.amount-items').innerHTML = productNow.amount;
        document.querySelector(".product .product-detail .product-price").innerHTML = productNow.price*productNow.amount + '$';
    }
    document.querySelector('.minus').onclick = ()=>{
        productNow.amount = productNow.amount-1;
        if(productNow.amount < 0){
            productNow.amount = 0;
        }
        document.querySelector('.amount-items').innerHTML = productNow.amount;
        document.querySelector(".product .product-detail .product-price").innerHTML = productNow.price*productNow.amount + '$';
    }
    document.querySelector('.add-to-cards').onclick = ()=>{
        cardList = getCardStorange();
        cardList.push(productNow);
        console.log('cardList',cardList);
        setCardStorange(cardList);
        document.querySelector('.shopping span').innerHTML = `( ${cardList.length})`;
        window.location.href = './pages/ShoppingCart.html';
    }
}

