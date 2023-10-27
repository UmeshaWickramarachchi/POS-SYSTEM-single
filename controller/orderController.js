import {CustomerModel} from "../model/CustomerModel.js";
import {customer_db} from "../db/db.js";
import {item_db} from "../db/db.js";

$('#order-nav').on('click', () => {

    // Customer Form Data
    const selectElement = document.querySelector(".form-select.content");

    // Create an array of data you want to add as options
    const data = [];

    customer_db.forEach(item => {
        let obj = {value: item.customer_id, text: item.customer_name, data1: item.contact, data2: item.address}
        data.push(obj);
    });

    console.log(data)

    // Loop through the data and create and append <option> elements
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.text;
        option.text = item.value;
        option.data1 = item.data1;
        option.data2 = item.data2;
        selectElement.appendChild(option);
    });

    // Add an event listener to the <select> element
    selectElement.addEventListener("click", function() {
        // Get the selected option
        const selectedOption = this.options[this.selectedIndex];

        // Perform your desired action with the selected option
        console.log("Selected ID:", selectedOption.value);
        console.log("Selected name:", selectedOption.text);
        document.getElementById('customerName').value = selectedOption.value;
        console.log("Selected contact:", selectedOption.data1);
        document.getElementById('customerContact').value = selectedOption.data1;
        console.log("Selected address:", selectedOption.data2);
        document.getElementById('customerAddress').innerHTML = selectedOption.data2;
    });

    // Optional: You can set a default option as selected
    // selectElement.selectedIndex = 0;

    /*===========================================================================================*/

    //Item Form
    const itemElement = document.querySelector(".item-drop");

    // Create an array of data you want to add as options
    const itemData = [];

    item_db.forEach(item => {
        let obj = {value: item.item_code, text: item.item_name,  data1: item.price, data2: item.qty}
        itemData.push(obj);
    });

    // Loop through the data and create and append <option> elements
    itemData.forEach(item => {
        const option = document.createElement("option");
        option.value = item.text;
        option.text = item.value;
        option.data1 = item.data1;
        option.data2 = item.data2;
        itemElement.appendChild(option);
    });

    // Optional: You can set a default option as selected
    itemElement.addEventListener("click", function() {
        // Get the selected option
        const selectedOption = this.options[this.selectedIndex];

        // Perform your desired action with the selected option
        console.log("Selected Value:", selectedOption.value);
        console.log("Selected Text:", selectedOption.text);
        document.getElementById('itemName').value = selectedOption.text;
        console.log("Selected Text:", selectedOption.data1);
        document.getElementById('itemPrice').value = selectedOption.data1;
        console.log("Selected Text:", selectedOption.data2);
        document.getElementById('itemQty').value = selectedOption.data2;
    });
});







