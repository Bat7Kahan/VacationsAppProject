//authentication controller

const express = require("express");
const router = express.Router();
const Credentials = require("../models/Credentials");
const loginLogic = require("../business-logic-layer/login-logic");

//gets credentials user input on client side
//if the credentials are correct user logs in
router.post("/", async (request, response) => {
    try {
        //Get Data
        const credentials = new Credentials(request.body);

        //validate
        const errors = credentials.validate();
        if (errors){
            return response.status(403).send(errors);
        }
        //Logic
        const loggedInUser = await loginLogic.loginAsync(credentials);
        if(!loggedInUser){
            return response.status(404).send("Incorrect username or password")
        }  
        else{
            return response.send(loggedInUser);
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500);
    }
});

module.exports = router;