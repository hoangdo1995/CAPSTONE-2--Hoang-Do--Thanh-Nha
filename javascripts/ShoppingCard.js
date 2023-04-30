import { getCardStorange,setCardStorange } from "./Controller/StorangeController.js";

window.onload = ()=>{
    cartListRender();
}
window.removeShoe = (id)=>{
    let cardList = getCardStorange();
    let indexRemove = cardList.findIndex((shoe)=>shoe.id === id);
    cardList.splice(indexRemove,1);
    setCardStorange(cardList);
    cartListRender();
}
window.cartListRender = ()=>{
    let cardList = getCardStorange();
console.log(cardList);
let htmlCards = cardList.reduce((html,shoe)=>{
    return html += `
    <tr>
    <td>
        <a href="./detail.html?id=${shoe.id}">
            <img src="${shoe.image}" alt="placehold">
        </a>
    </td>
    <td>${shoe.amount}</td>
    <td><a href="./detail.html">${shoe.name}</a></td>
    <td>${shoe.price*shoe.amount}</td>
    <td>
        <!-- <button class="btn-view">Add</button> -->
        <button class="btn-delete" onclick="removeShoe(${shoe.id})">Delete</button>
    </td>
</tr>
    `;
},'');

document.querySelector('#cardListBody').innerHTML = htmlCards;
document.querySelector('.shopping span').innerHTML = `( ${cardList.length})`;
}
