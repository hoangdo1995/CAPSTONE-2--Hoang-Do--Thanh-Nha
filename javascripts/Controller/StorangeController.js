export function getCardStorange(){
    if(localStorage.getItem('cardList')){
        let cardListStr = localStorage.getItem('cardList');
        let cardList = JSON.parse(cardListStr);
        return cardList;
    }
    else{
        localStorage.setItem('cardList',[]);
        return null;
    }
}
export function setCardStorange(cardList){
    localStorage.setItem('cardList',JSON.stringify(cardList));
    console.log('setitem');
}

window.onload = ()=>{
    let cardList = getCardStorange();
    document.querySelector('.shopping span').innerHTML = `( ${cardList.length})`;
};
