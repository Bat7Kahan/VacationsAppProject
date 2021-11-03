const dal = require("../data-access-layer/dal");

function getListOfVacations(id) {
    //getting list of vacations with the one that this user is following as first in the list
    const sqlCmd = `select DISTINCT v.id, v.description,v.destination, v.image, v.start_date, v.end_date, v.price, 
    EXISTS(select * from followes where vacation_id = f.vacation_id and user_id=?) AS isFollowing, count(f.user_id) AS followers
    from vacations as v left join followes as f
    on v.id = f.vacation_id
    GROUP BY id
    ORDER BY isFollowing DESC`;
    const listOfVacations = dal.executeQueryAsync(sqlCmd,[id]);
    return listOfVacations;
}

async function handleFollowAsync(user_id, vacation_id){
        //checking if row exsits in db - is he a follower?
        const result = await dal.executeQueryAsync(`SELECT count(*) as x from followes WHERE user_id=? and vacation_id=?`,[user_id, vacation_id]);
        if(result[0].x == 1){
            //true - removing row
            const result = dal.executeQueryAsync('DELETE FROM followes WHERE user_id=? AND vacation_id=?',[user_id, vacation_id]);
            return result;
        }
        else{
            //false - adding row
            const result = dal.executeQueryAsync('INSERT INTO followes(user_id, vacation_id) VALUES (?,?)',[user_id, vacation_id]);
            return result;
        }
}

module.exports = {
    getListOfVacations,
    handleFollowAsync
}