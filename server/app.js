const express = require("express");
const cors = require("cors");

const loginController = require("./controllers-layer/login-controller");
const signupController = require("./controllers-layer/signup-controller")
const userController = require("./controllers-layer/user-controller");
const adminController = require("./controllers-layer/admin-controller");
const imageController = require("./controllers-layer/image-controller");
const socketLogic = require("./business-logic-layer/socket-logic");

const server = express();

const listener = server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (err) => {
    if (err.code === "EADDRINUSE")
        console.log("Error: Address in use");
    else 
        console.log("Error: Unknown error");
});



server.use(cors());
server.use(express.json());

server.use("/login", loginController);
server.use("/signup", signupController);
server.use("/admin", adminController);
server.use("/user", userController);
server.use("/images", imageController)

socketLogic.init(listener);


server.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});



