const md5 = require('md5');

module.exports = (app, db) => {
    app.post('/updatePassword', (req, res) => {
        let output = {status: 'NO'};
        let {password, id} = req.headers;
        password = md5(password);
        db.connect(() => {
            let sql = "SELECT `password` FROM `accounts` WHERE `ID` = ?";
            db.query(sql, [id], (err, passwordData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(passwordData[0].password == password) {
                    output = {
                        status: 'OK',
                        updatedPasswordRows: 0,
                    };
                    res.send(output);
                    return;
                } else {
                    let sql2 = "UPDATE `accounts` SET `password` = ? WHERE `ID` = ?";
                    db.query(sql2, [password, id], (err, results) => {
                        if(err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        output = {
                            status: 'OK',
                            updatedPasswordRows: results.affectedRows
                        };
                        res.send(output);
                    })
                }
            });
        })
    })
};