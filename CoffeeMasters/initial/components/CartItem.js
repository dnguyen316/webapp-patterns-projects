import { removeFromCart } from "../services/Order.js";

export default class CartItem extends HTMLElement {
    constructor() {
        super();    
    }   

    connectedCallback() {
        const item = JSON.parse(this.dataset.item);
        this.innerHTML = ""; // Clear the element

        const template = document.getElementById("cart-item-template");

        function interpolate(str, params) {
            let names = Object.keys(params);
            let values = Object.values(params)
            const body = `return \`${str}\`;`
            //example return `<h1>${title}</h1><p>${description}</p>`
            return new Function(...names, body)(...values)

            /**E.g from the Function return 
             * (function(title, description)){
             *      return `<h1>${title}</h1><p>${description}</p>`
             */
        }

        this.innerHTML = interpolate(template.innerHTML, {
            qty: `${item.quantity}`,
            color: 'X',
            name: item.product.name,
            price: `${item.product.price.toFixed(2)}`,
        })
       
        this.querySelector("a.delete-button").addEventListener("click", event => {
            removeFromCart(item.product.id);
        })
      }
}

customElements.define("cart-item", CartItem);