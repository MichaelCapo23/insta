async function checkPassword(app, db, password, username) {
    let newPassword = false;
    let sql = "SELECT COUNT(*) AS rows FROM `accounts` WHERE `password` = ? OR `username` = ?";
    await db.connect(() => {
        db.query(sql, [password, username], (err, data) => {
            if(err) {
                console.log(err);
                return Promise.resolve(newPassword);
            }
            let rows = data[0].rows;
            if (rows) {
                newPassword = true;
            }
            console.log('newPassword: '+newPassword);
            return Promise.resolve(newPassword);
        })
    });
}

module.exports = {
    checkPassword
};




