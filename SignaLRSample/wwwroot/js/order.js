﻿
var connectionOrder = new signalR.HubConnectionBuilder().withUrl("/hubs/order").build();



var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {

    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Home/GetAllOrder"
        },
        "columns": [
            { "data": "id", "width": "5%" },
            { "data": "name", "width": "15%" },
            { "data": "itemName", "width": "15%" },
            { "data": "count", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="w-75 btn-group" role="group">
                        <a href=""
                        class="btn btn-primary mx-2"> <i class="bi bi-pencil-square"></i> </a>
                      
					</div>
                        `
                },
                "width": "5%"
            }
        ]
    });
}
connectionOrder.on("newOrder", () => {
    dataTable.ajax.reload();
    toast.success("New Order recieved");
});

function fulfilled() {

}

function rejected() {

}

connectionOrder.start().then(fulfilled, rejected);
