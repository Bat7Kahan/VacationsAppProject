const io = require("socket.io");

let socketsManager;

function init(listener) {

    socketsManager = io(listener, { cors: {origin: "http://localhost:3000"}});// Allow react front

    socketsManager.sockets.on("connection" , socket => {

        console.log("A client has been connected.");

        socket.on("disconnect", () => {
            console.log("A client has been disconnected");
        });
    });
}

function notifyClients() {
    socketsManager.sockets.emit("admin-change-something");
}

module.exports = {
    init,
    notifyClients
}