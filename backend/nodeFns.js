async function checkPassword(app, db, password) {
    let newPassword = "0";
    let sql = "SELECT COUNT(*) AS rows FROM `accounts` WHERE `password` = ?";
    db.connect(() => {
        db.query(sql, password, (err, data) => {
            if(err) {
                console.log(err);
                return Promise.resolve(newPassword);
            }
            let rows = data[0].rows;
            if (rows) {
                newPassword = "1";
            }
            console.log('newPassword: '+newPassword);
            return Promise.resolve(newPassword);
        })
    });
}

module.exports = {
    checkPassword
};




