
var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");

//create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathyhallows").build();

//connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDealthyHallowCount", (cloak,stone,wand) => {

    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});



//start connection
//tạo 2 func nếu thành công và bị từ chối
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });
}
function rejected() {
    //rejected logs
    console.log(DOMException.toString());
}

connectionDeathlyHallows.start().then(fulfilled, rejected);

