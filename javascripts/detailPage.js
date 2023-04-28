
var id = 3;

function postProductDetails(prod){
    console.log(prod.data.content);
    var product = prod.data.content;
    var productImg = `<img src="${product.image}" alt="${product.alias}">`;
    var productInfor = `<h1>${product.name}</h1>
                        <p>${product.description}</p>`;
    var productPrice = `<p>${product.price}<span>$</span></p>`;
    document.querySelector(".product .product-image").innerHTML = productImg;
    document.querySelector(".product .product-detail .product-descriptions").innerHTML = productInfor;
    document.querySelector(".product .product-detail .product-price").innerHTML = productPrice;
}

function postRelatedProduct(prod){
    var productList = prod.data.content.relatedProducts;
    var relatedProduct = '';
    for(var i = 0; i < productList.length; i++){
        var product = productList[i];
        relatedProduct += 
        `<div class="product-item">
            <div class="item-container">
                <div class="item-infor">
                    <a href="/pages/detail.html?id=${product.id}">
                        <div class="item-image">
                            <img src="${product.image}" alt="${product.alias}">
                        </div>
                        <p class="item-name">${product.name}</p>
                        <p class="item-desc">${product.description}</p>
                    </a>
                </div>
                <div class="item-shopping">
                    <button onclick="getProductId()"><a href="./pages/detail.html?id=${product.id}"><span>Buy now</span></a></button>
                    <div class="item-price">
                        <p class="price">$${product.price}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.querySelector("#product-body").innerHTML = relatedProduct;
}

function renderUI(){
    var promise = callApi(`/getbyid?id=${id}`);
    promise.then(function(prod){
        postProductDetails(prod);
        postRelatedProduct(prod);
    })
}

renderUI();




