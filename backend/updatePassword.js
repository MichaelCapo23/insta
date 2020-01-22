const md5 = require('md5');

module.exports = (app, db) => {
    app.post('/updatePassword', (req, res) => {
        let output = {status: 'NO'};
        let {password, id} = req.headers;
        password = md5(password);
        db.connect(() => {
            let sql = "UPDATE `accounts` SET `password` = ? WHERE `ID` = ?";

            db.query(sql, [password, id], (err, results) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                console.log(results);
                output = {
                    status: 'OK',
                    updatedPasswordRows: results.affectedRows
                };
                res.send(output);
            })
        })
    })
};