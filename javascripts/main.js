import {
    callApi
} from "./ApiConnector/connector.js";
import {
    Product
} from "./Model/Product.js";


callApi('/Product/getbyid?id=1').then(function (result) {

    let data = result.data.content;
    console.log(data);
    let product = new Product();
    console.log(product);
    product = Object.assign(product, data);
    let listShoe = product['relatedProducts'];
    console.log(listShoe);
    let carouselHTML = listShoe.reduce((html, item) => {
        html += `
        <div class="carousel-item">
        <div class="item-content">
            <div class="image">
                <img src="${item['image']}" alt="">
            </div>
            <div class="description">
                <p class="name">${item['name']}</p>
                <p class="content">${item['description']}</p>
                <button><a href="./pages/detail.html?id=${item['id']}"><span>Buy now</span></a></button>
            </div>
        </div>
    </div> 
        `;
        return html;
    }, '');
    // console.log(carouselHTML);

    document.querySelector('#carouselBody').innerHTML = carouselHTML;
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });
    // thay đổi nội dung mặc đinh của carousel2
    (() => {
        let listnav = document.querySelectorAll('.owl-nav button');
        listnav.forEach(nav => {
            nav.innerHTML = '';
        });
    })();
});

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

window.onload = ()=>{
    let cardList = getCardStorange();
    document.querySelector('.shopping span').innerHTML = `( ${cardList.length})`;
};