import { callApi } from "./ApiConnector/connector.js";
// thay đổi nội dung mặc đinh của carousel2
(()=>{
    let listnav = document.querySelectorAll('.owl-nav button');
listnav.forEach(nav => {
    nav.innerHTML ='';
});
})();

callApi('/getProductByCategory?categoryId=MEN').then(function(result){
    console.log(result);
});

