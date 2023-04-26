import { getCookie,setCookie } from "../Utilities/CookieMethod.js";
window.onload = ()=>{
    console.log(getCookie('name'));
    if(getCookie('name')&&getCookie('name')!=''){
        document.querySelector('#name').value =  getCookie('name');
    }
    if(getCookie('email')&&getCookie('email')!=''){
        document.querySelector('#email').value =  getCookie('email');
    }
    if(getCookie('phone')&&getCookie('phone')!=''){
        document.querySelector('#phone').value =  getCookie('phone');
    }
}

window.setCookieRegister = (name,email,phone)=>{
    setCookie('name',name,5);
    setCookie('email',email,5);
    setCookie('phone',phone,5);
}

