//user controller
const express = require("express");
const router = express.Router();

const fileUpload = require("express-fileupload");
const userLogic = require("../business-logic-layer/user-logic");
const verifyLoggedIn = require("../middleware/verify-login");

router.use(fileUpload());

//GET
router.get("/vacationList/:id",[verifyLoggedIn], async (request, response) => {
    try {
        const result = await userLogic.getListOfVacations(request.params.id);
        if(result.length == 0){
            console.log("No vacations found");
            response.status(404).send("No vavcation found");
        }
        else{
            console.log(result);
            response.send(result);
        }
    } catch (error) {
        console.log(error);
        response.status(500);
    }
});

//POST
router.post("/handleFollow",[verifyLoggedIn],async (request, response) => {
    const user_id = request.body.user_id;
    const vacation_id = request.body.vacation_id;
    try {
        const result = await userLogic.handleFollowAsync(user_id, vacation_id);
        response.status(200).send(result);
    } catch (error) {
        console.log(error);
        response.status(500);
    }

});

module.exports = router;
