import { callApi } from "../ApiConnector/connector.js";
import { getCookie, setCookie } from "../Utilities/CookieMethod.js";

window.changeStatePageLogin = ()=>{
    document.querySelector('.login-hold').classList.toggle('active');
}
window.onload = ()=>{
    let emailCookie = '';
    if(getCookie('email') && getCookie('email')!=''){
        emailCookie = getCookie('email');
        document.querySelector('#email_login').value = emailCookie;
    }
}

document.querySelector('#form_login').onsubmit = (e) =>{
    e.preventDefault();
    let listInput = document.querySelectorAll('#form_login input');
    console.log(listInput);
    let userLogin = [];
    listInput.forEach(input =>{
        let {id,value} =  input;
        userLogin[id] = value;
    });
    console.log(userLogin);
    let promise = axios({
        url:'https://shop.cyberlearn.vn/api/Users/signin',
        method:'post',
        data:{
            "email": userLogin.email_login,
            "password": userLogin.password_login
          }
    }).then(result=>{
        document.querySelector('#login_error').style.color = "green";
        document.querySelector('#login_error').innerHTML = result.data.message;
        setCookie('email',userLogin.email_login,365);
        setTimeout(()=>{
            changeStatePageLogin();
        },1000);
    }).catch(error=>{
        document.querySelector('#login_error').innerHTML = error.response.data.message;
    })
}