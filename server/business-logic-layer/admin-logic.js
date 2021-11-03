const dal = require("../data-access-layer/dal");

function addNewVacationAsync(vacation){
    const sqlCmd = `INSERT INTO vacations(ID, description, destination, image, start_date, end_date, price) VALUES (DEFAULT,?,?,?,?,?,?)`;
    const newVacation = dal.executeQueryAsync(sqlCmd,[vacation.description, vacation.destination,vacation.image.name, vacation.start_date,vacation.end_date, vacation.price]);
    return newVacation;
}

function getListOFVacationsAsync(){
    const sqlCmd = "select DISTINCT v.id, v.description,v.destination, v.image, v.start_date, v.end_date, v.price, count(f.user_id) AS followers from vacations as v left join followes as f on v.id = f.vacation_id GROUP BY id";
    const listOfVacations = dal.executeQueryAsync(sqlCmd);
    return listOfVacations;
}
function deleteVacationAsync(id) {
    const sqlCmd = "delete from vacations where id=?";
    const result = dal.executeQueryAsync(sqlCmd, [id]);
    return result;
}

function editVacationAsync(vacation){
    let sqlCmd="";
    if(vacation.image != null){
        sqlCmd =  `UPDATE vacations SET 
        description=?,
        destination=?,
        start_date=?,
        end_date=?,
        price=?, 
        image=? 
        WHERE 
        ID=?"${vacation.id}"`;
        const editedVacation = dal.executeQueryAsync(sqlCmd,[vacation.description,vacation.destination,vacation.start_date,vacation.end_date,vacation.image,vacation.price,vacation.id]);
        return editedVacation;
    }
    else{
        sqlCmd =  `UPDATE vacations SET 
        description=?,
        destination=?,
        start_date=?,
        end_date=?,
        price=?
        WHERE 
        id=?`;

        const editedVacation = dal.executeQueryAsync(sqlCmd,[vacation.description,vacation.destination,vacation.start_date,vacation.end_date,vacation.price,vacation.id]);
        return editedVacation;
    }
}

function getChartInfoAsync(){
    const sqlCmd = "select DISTINCT v.description as label, count(f.user_id) as y from vacations as v left join followes as f on v.id = f.vacation_id GROUP BY id HAVING y>0";
    const vacationInfo = dal.executeQueryAsync(sqlCmd);
    return vacationInfo;
}

module.exports = {
    addNewVacationAsync,
    getListOFVacationsAsync,
    deleteVacationAsync,
    editVacationAsync,
    getChartInfoAsync
}