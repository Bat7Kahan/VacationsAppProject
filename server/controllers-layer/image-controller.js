//image controller
const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

//GET
router.get("/:imageName", (request, response) => {
    try {
        // Data: 
        const imageName = request.params.imageName;

        // Logic: 
        let imageFile = path.join(__dirname, "../images", imageName);
        if (!fs.existsSync(imageFile)) imageFile = locations.notFoundImageFile;

        // Success: 
        response.sendFile(imageFile);
    }
    catch (error) {
        console.log(error);
        response.status(500);
    }
});

module.exports = router;