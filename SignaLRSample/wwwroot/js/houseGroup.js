let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");


//create connection
var connectionHouseGroup = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/houseGroup").build();

btn_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "gryffindor");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

btn_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "slytherin");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "hufflepuff");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "ravenclaw");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

//tạo sự kiện unsub cho 4 house
btn_un_gryffindor.addEventListener("click", function (event) {

    connectionHouseGroup.send("LeaveHouse", "gryffindor");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

btn_un_slytherin.addEventListener("click", function (event) {

    connectionHouseGroup.send("LeaveHouse", "slytherin");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

btn_un_hufflepuff.addEventListener("click", function (event) {

    connectionHouseGroup.send("LeaveHouse", "hufflepuff");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

btn_un_ravenclaw.addEventListener("click", function (event) {

    connectionHouseGroup.send("LeaveHouse", "ravenclaw");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});


//tạo request send đến hub để nhận trigger
trigger_gryffindor.addEventListener("click", function (event) {

    connectionHouseGroup.send("TriggerHouseNotify", "gryffindor");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

trigger_slytherin.addEventListener("click", function (event) {

    connectionHouseGroup.send("TriggerHouseNotify", "slytherin");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

trigger_hufflepuff.addEventListener("click", function (event) {

    connectionHouseGroup.send("TriggerHouseNotify", "hufflepuff");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});

trigger_ravenclaw.addEventListener("click", function (event) {

    connectionHouseGroup.send("TriggerHouseNotify", "ravenclaw");
    //ngăn chặn sự kiện submit
    event.preventDefault();
});


//nhận trigger thông báo đến các group houseName
connectionHouseGroup.on("triggerHouseNotification", (houseName) => {
    toastr.success(`a new notification for ${houseName} has been launched`);
});

//thông báo đến các house khác trong cùng một group khi có một new member đăng ký vào house đó
connectionHouseGroup.on("newMemberAddedToHouse", (houseName) => {
    toastr.success(`Member has subcribed to ${houseName}`);
});

connectionHouseGroup.on("newMemberRemovedFromHouse", (houseName) => {
    toastr.warning(`Member has unsubcribed to ${houseName}`);
});

//nhận sự kiện từ server gửi về
connectionHouseGroup.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;

    if (hasSubscribed) {
        //đăng ký house
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;

            case 'gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;

            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;

            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
        }
        toastr.success(`You have Subcribed Successfully. ${houseName}`);
    }
    else {

        //hủy đăng ký
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;

            case 'gryffindor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;

            case 'hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;

            case 'ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
        }

        toastr.warning(`You have UnSubcribed Successfully. ${houseName}`);
    }
});


//start connection
//tạo 2 func nếu thành công và bị từ chối
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");

}
function rejected() {
    //rejected logs
    console.log(DOMException.toString());
}

connectionHouseGroup.start().then(fulfilled, rejected);