import {ItemModel} from "../model/ItemModel.js";
import {item_db} from "../db/db.js";



var row_index = null;


const loadItemData = () => {
    $('#item-tbl-body').empty(); // make tbody empty
    item_db.map((item, index) => {
        console.log(item);
        let record = `<tr>
        <td class="item_code">${item.item_code}</td>
        <td class="item_name">${item.item_name}</td>
        <td class="price">${item.price}</td>
        <td class="qty">${item.qty}</td>
        </tr>`;
                $("#item-tbl-body").append(record);
            })
};

$("#saveItem-btn>button[type='button']").on("click", () => {
    // collect data from the array
    let item_code = $("#new-item-code").val();
    let item_name = $("#new-item-name").val();
    let price = $("#item-price").val();
    let qty=$("#item-qty").val();

    let item_obj = new ItemModel(item_code, item_name, price, qty);

    // save in the db
    item_db.push(item_obj);
    console.log(item_db);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item saved successfully!',
        showConfirmButton: false,
        timer: 1500
    })




    loadItemData();


});

//Update Items
$("#item-btns>button[type='button']").eq(1).on("click", () => {
    // collect data from the array
    let item_code = $("#item-code").val();
    let item_name = $("#item-name").val();
    let price = $("#price").val();
    let qty=$("#qty").val();

    let item_obj = new ItemModel(item_code, item_name, price, qty);



    // find item index
    let index = item_db.findIndex(item => item.item_code === item_code);

    // update item in the db
    item_db[index] = item_obj;
    loadItemData();

});

// //Delete Customer
// $("#item-btns>button[type='button']").eq(2).on("click", () => {
//
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             let item_code = $("#item-code").val();
//
//             // find item index
//             let index = item_db.findIndex(item => item.item_code === item_code);
//
//             // remove the item from the db
//             item_db.splice(index, 1);
//
//             Swal.fire(
//                 'Deleted!',
//                 'Your file has been deleted.',
//                 'success'
//             )
//         }
//     })
//
//
//     loadItemData();
// })
//
//
//
$("#item-tbl-body").on("click", "tr", function() {
    row_index = $(this).index();

    console.log(row_index);

    let item_code = $(this).find(".item_code").text();
    let item_name = $(this).find(".item_name").text();
    let price = $(this).find(".price").text();
    let qty = $(this).find(".qty").text();


    $("#item-code").val(item_code);
    $("#item-name").val(item_name);
    $("#price").val(price);
    $("#qty").val(qty);

});
