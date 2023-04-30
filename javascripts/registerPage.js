import {
    callApi
} from "./ApiConnector/connector.js";
(() => {
    let listInputTag = document.querySelectorAll('#register-form .input-tag');
    listInputTag.forEach((tag) => {
        let inputTag = tag.parentElement.querySelector('input');
        tag.addEventListener('click', function () {
            inputTag.focus();
            tag.style.transform = "translateY(0)";
        });
        setInterval(() => {
            if (inputTag.value !== '') {
                tag.style.transform = "translateY(0)";
            }
        }, 2000);
    });
})();

//Xử lý xự kiện submit khi nhấn nút submit
document.querySelector('#register-form').onsubmit = function () {
    event.preventDefault();
    let user = {};
    let listInput = document.querySelectorAll('input');
    console.log(listInput);
    listInput.forEach((input) => {
        let {
            id,
            value
        } = input;
        user[id] = value.trim();
    });
    let gender = document.querySelector('[name="gender"]').value;
    if (gender === 'true') {
        user['gender'] = true;
    } else {
        user['gender'] = false;
    }
    let validate = (nullValidate(user.email, 'email') ? emailValidate(user.email, 'email') : false) & (nullValidate(user.password, 'password') ? passwordValidate(user.password, 'password') : false) & (nullValidate(user.password_confirm, 'password-confirm') ? passwordConfirm(user.password, user.password_confirm, 'password-confirm') : false) & (nullValidate(user.name, 'name') ? nameValidate(user.name, 'name') : false) & (nullValidate(user.phone, 'phone') ? phoneValidate(user.phone, 'phone') : false);

    console.log(user);
    setCookieRegister(user['name'],user['email'],user['phone']);
    if (validate) {
        delete user.password_confirm;
        delete user[''];
        
        
        let promise = axios({
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            method: 'post',
            data: user
        }).then((result) => {
            let succesNotify = result.data.message;
            alert(succesNotify);
            // window.location.href = '../index.html';
            changeStatePageLogin();
        }).catch((error) => {
            let errorNotify = error.response.data.message;
            document.querySelector('#email-error').innerHTML = errorNotify;
        });
    }
}