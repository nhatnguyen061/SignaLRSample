//create connection
var connectionChat = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/chat").build();

document.getElementById("sendMessage").disabled = true;

connectionChat.on("MessageReceived", (user, message) => {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} - ${message}`;

});

document.getElementById("sendMessage").addEventListener("click", function (event) {
    var sender = document.getElementById("senderEmail").value;
    var message = document.getElementById("chatMessage").value;
    var receiver = document.getElementById("receiverEmail").value; 

    //send mess to priveta receiver
    if (receiver.length > 0) {
        connectionChat.send("SendMessageToReceiver", sender, receiver, message).catch(function (err) {
            return console.error(err.toString());
        })
    } else {
        //send message to all user
        connectionChat.send("SendMessageToAll", sender, message).catch(function (err) {
            return console.error(err.toString());
        })
    }

    event.preventDefault();
});

//start connection
//tạo 2 func nếu thành công và bị từ chối
function fulfilled() {
    //do something on start
    document.getElementById("sendMessage").disabled = false;
}
function rejected() {
    //rejected logs
    console.log(DOMException.toString());
}

connectionChat.start().then(fulfilled, rejected);