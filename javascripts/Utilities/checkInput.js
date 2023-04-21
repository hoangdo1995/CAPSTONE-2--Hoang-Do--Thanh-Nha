/**
 * hàm kiểm tra trung lấp dử liệu dựa trên gia trị và thiết lập cảnh báo ra trình duyệt qua đối tượng có id = `#${name}-error`
 * @param {*} value 
 * @param {*} name 
 * @returns true nếu dử liệu không trống, false nêu dử liệu nhập vào rổng
 */
function nullValidate(value, name){
    if(value === '' || value === 0){
        document.querySelector(`#${name}-error`).innerHTML = `không được để trống!`;
        return false;
    }
    else{
        document.querySelector(`#${name}-error`).innerHTML ='';
        return true;
    }
}

/**
 * kiểm tra tính hợp lệ của trường account
 * @param {*} value 
 * @param {*} name 
 * @returns 
 */
function accountValidate(value,name){
    var accountRegex = /[0-9]{4,6}/g;
    if(!accountRegex.test(value)){
        document.querySelector(`#${name}-error`).innerHTML = 'Tài khoản tối đa 4 - 6 ký số';
        return false;
    }
    else{
        document.querySelector(`#${name}-error`).innerHTML = ''; 
        return true;
    }
}

/**
 * kiểm tra tính hợp lệ của trường email
 * @param {*} value 
 * @param {*} name 
 * @returns 
 */
function emailValidate(value, name){
    var emailRegex = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    if(!emailRegex.test(value)){
        document.querySelector(`#${name}-error`).innerHTML = `sai định dạng!`;
        return false;
    }
    else{
        document.querySelector(`#${name}-error`).innerHTML ='';
        return true;
    }
}

/**
 * kiểm tra tính hợp lệ của trường name
 * @param {*} value 
 * @param {*} name 
 * @returns 
 */
function nameValidate(value, name){

    var nameRegex = /[a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ']$/g;
    if(!nameRegex.test(value)){
        document.querySelector(`#${name}-error`).innerHTML = `phải là chử! `;
        return false;
    }
    else{
        document.querySelector(`#${name}-error`).innerHTML = '';
        return true;
    }
}

/**
 * kiểm tra tính hợp lệ của trường passoword
 * @param {*} value 
 * @param {*} name 
 * @returns 
 */
function passwordValidate(value, name){
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
    if(!passwordRegex.test(value)){
        document.querySelector(`#${name}-error`).innerHTML = `sai định dạng!`;
        return false;
    }
    else{
        document.querySelector(`#${name}-error`).innerHTML = '';
        return true;
    }
}

function phoneValidate(value,name){
    var phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if(!phoneRegex.test(value)){
        document.querySelector(`#${name}-error`).innerHTML = `${name} sai định dạng`;
        return false;
    }
    else{
        document.querySelector(`#${name}-error`).innerHTML = '';
        return true;
    }
}

function passwordConfirm(password,Confirm,name){
    if(password!==Confirm){
        document.querySelector(`#${name}-error`).innerHTML = `không khớp`;
        return false;
    }
    else{
        document.querySelector(`#${name}-error`).innerHTML = '';
        return true;
    }
}





/**
 * hàm chuyển chuổi về sạng không dấu
 * @param {*} title 
 * @returns 
 */
function ChangeToSlug(title) { 
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
}