function callApi(endpoint = '', method = 'GET',body){
    return axios({
        url:`https://shop.cyberlearn.vn/api/Product${endpoint}`,
        method: method,
        responseType:"json",
        data: body
    }).catch(error => {
        console.log(error);
    })
}
