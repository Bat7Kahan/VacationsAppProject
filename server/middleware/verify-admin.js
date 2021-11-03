function verifyAdmin(request, response, next) {
    console.log(request.user);
    if (request.user && request.user.role=="Admin")
        next();
    else {
        return response.status(401).send("Unauthorized (admin)");
    }
}

module.exports = verifyAdmin;