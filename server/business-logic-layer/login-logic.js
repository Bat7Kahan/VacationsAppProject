const dal = require("../data-access-layer/dal");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

async function loginAsync(credentails){
    try{
        const sqlCmd = `select id,first_name,last_name,username,password,role from users where username=? and password=?`;
        const user = await dal.executeQueryAsync(sqlCmd,[credentails.username, credentails.password]);
        if(!user || user.length < 1){
            return null;
        }
        delete user[0].password;
        const token = jwt.sign( {user:user[0]}, config.token.key ,{expiresIn: config.token.expiresIn});
        user[0].token = token;
        return user[0];
    }
    catch(error){
        console.log(error);
        return error;
    }
}

module.exports = {
    loginAsync
}