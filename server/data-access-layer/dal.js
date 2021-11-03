const db=require("mysql");
const config = require("../config.json");

const pool=db.createPool({
    host: config.database.host,
    user: config.database.user,
    database: config.database.name
});

function executeQueryAsync(sqlCmd,values) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd,values, (err, rows)=> {
            if (err) {
                reject(err);
            }
            else{
                resolve(rows);
            }
        });
    });
}

module.exports = {
    executeQueryAsync
};