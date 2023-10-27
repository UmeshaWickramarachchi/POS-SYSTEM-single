import {CustomerModel} from "../model/CustomerModel.js";
import {customer_db} from "../db/db.js";
var row_index = null;


const loadCustomerData = () => {
    $('#customer-tbl-body').empty(); // make tbody empty
    customer_db.map((item, index) => {
        console.log(item);
        let record = `<tr>
<td class="customer_id">${item.customer_id}</td>
<td class="customer_name">${item.customer_name}</td>
<td class="contact">${item.contact}</td>
<td class="address">${item.address}</td>
</tr>`;
        $("#customer-tbl-body").append(record);
    })
};

//Save Customer
$("#saveCustomer-btn>button[type='button']").eq(1).on("click", () => {
    // collect data from the array
    let customer_id = $("#new-customer-id").val();
    let customer_name = $("#new-customer-name").val();
    let mobile = $("#new-contact").val();
    let customer_address=$("#new-address").val();

    let customer_obj = new CustomerModel(customer_id, customer_name, mobile, customer_address);

    console.log(customer_obj)

    // save in the db
    customer_db.push(customer_obj);
    console.log(customer_db)

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Customer saved successfully!',
        showConfirmButton: false,
        timer: 1500
    })

    // load student data
    loadCustomerData();

});

//Update Customer
$("#customer-btns>button[type='button']").eq(1).on("click", () => {
    // collect data from the array
    let customer_id = $("#customer-id").val();
    let customer_name = $("#customer-name").val();
    let contact = $("#contact").val();
    let address=$("#address").val();

    let customer_obj = new CustomerModel(customer_id, customer_name, contact, address);


    // find item index
    let index = customer_db.findIndex(item => item.customer_id === customer_id);

    // update item in the db
    customer_db[index] = customer_obj;
    loadCustomerData();

});

//Delete Customer
$("#customer-btns>button[type='button']").eq(2).on("click", () => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let customer_id = $("#customer-id").val();

            // find item index
            let index = customer_db.findIndex(item => item.customer_id === customer_id);

            // remove the item from the db
            customer_db.splice(index, 1);

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            loadCustomerData();
        }
    })



})



$("#customer-tbl-body").on("click", "tr", function() {
    row_index = $(this).index();

    console.log(row_index);

    let customer_id = $(this).find(".customer_id").text();
    let customer_name = $(this).find(".customer_name").text();
    let contact = $(this).find(".contact").text();
    let address = $(this).find(".address").text();


    $("#customer-id").val(customer_id);
    $("#customer-name").val(customer_name);
    $("#contact").val(contact);
    $("#address").val(address);

});