//admin controller
const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");

const adminLogic = require("../business-logic-layer/admin-logic");
const Vacation = require("../models/Vacation");

const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-login");
const { notifyClients } = require("../business-logic-layer/socket-logic");

router.use(fileUpload());

//POST
router.post("/addVacation",[verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        //Data
        const newVacation = new Vacation(request.body,request.files.image);

        //validate
        const errors = newVacation.validatePost();
        if (errors){
            return response.status(400).send(errors);
        }
        const result = await adminLogic.addNewVacationAsync(newVacation);
        const absolutePath = path.join(__dirname, "..", "images", newVacation.image.name);
        if (!fs.existsSync(absolutePath)) {
            await newVacation.image.mv(absolutePath);   // mv = move
        }
        notifyClients();
        return response.status(200).send();
    }
    catch (error) {
        console.log(error);
        response.status(500);
    }
});

//GET
router.get("/vacationList",[verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        const result = await adminLogic.getListOFVacationsAsync();
        if(result.length == 0){
             return response.status(404).send("No Vacations Found!!");
        }
        else{
            return response.send(result);
        }
    } catch (error) {
        console.log(error);
        return response.status(500);
    }
});

//DELETE
router.delete("/deleteVacation/:id",[verifyLoggedIn, verifyAdmin], async (request,response) => {
    const id = request.params.id;
    try {
        const result = await adminLogic.deleteVacationAsync(id);
        notifyClients();
        return response.send();
    } catch (error) {
        console.log(error);
        return response.status(500);
    }
});

//PUT
router.put("/editVacation",[verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        newVacation = new Vacation(request.body,request.files? request.files.image[0].name:null);
        const errors = newVacation.validateUpdate();
        if (errors){
            return response.status(400).send(errors);
        }
        const result = await adminLogic.editVacationAsync(newVacation);
        if(newVacation.image){
            const absolutePath = path.join(__dirname, "..", "images", newVacation.image);
            if (!fs.existsSync(absolutePath)) {
                await newVacation.image.mv(absolutePath);   // mv = move
            }
        }
        notifyClients();
        return response.status(200).send();
    }
    catch (error) {
        console.log(error);
        response.status(500);
    }
});

//GET
router.get("/getListForReports",[verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        const result =await  adminLogic.getChartInfoAsync();
        if(result.length == 0){
            response.status(404).send("No results Found!!");
        }
        else{
            response.send(result);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500);
    }
});



module.exports = router;