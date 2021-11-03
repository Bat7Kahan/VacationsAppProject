//public controller
const express = require("express");
const router = express.Router();

const signupLogic = require("../business-logic-layer/signup-logic");
const User = require("../models/User");

//POST
router.post("/", async (request, response) => {
    try {
        //Data
        const newUser = new User(request.body);
        //validate
        const errors = newUser.validate();
        if (errors){
            return response.status(403).send(errors);
        }
        
        const validUser = await signupLogic.checkIfUsernameAlreadyExistsAsync(newUser.username);
        if(validUser[0] != undefined){
            return response.status(400).send("Username already taken - try a different username");
        }
        const result = await signupLogic.addNewUserAsync(newUser);
        return response.status(200).send();
    }
    catch (error) {
        console.log(error);
        response.status(500);
    }
});

module.exports = router;