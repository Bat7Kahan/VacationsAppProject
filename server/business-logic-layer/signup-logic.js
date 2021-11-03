const dal = require("../data-access-layer/dal");

function checkIfUsernameAlreadyExistsAsync(username){
    //does this username already exist in db
    const sqlCmd = `select username from users where username=?`;
    return  dal.executeQueryAsync(sqlCmd,[username]);
}

function addNewUserAsync(newUser){
    //adds new user
    const sqlCmd = `insert into users (id, first_name, last_name, username, password, role) VALUES (DEFAULT,?,?,?,?,"user")`;
    const result = dal.executeQueryAsync(sqlCmd,[newUser.firstname,newUser.lastname,newUser.username,newUser.password]);
    return result;
}

module.exports = {
    checkIfUsernameAlreadyExistsAsync,
    addNewUserAsync,
}