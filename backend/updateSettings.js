module.exports = (app, db) => {
    app.post('/updateSettings', (req, res) => {
        let output = {status: 'NO'};
        let {valuesarr, id} = req.headers;
        valuesarr = JSON.parse(valuesarr);
        db.connect(() => {
            let sqlBuild = "UPDATE `accounts` SET ";
            let vals = [];
            for(let [key, value] of Object.entries(valuesarr)) {
                sqlBuild += `${key} = ?, `;
                vals.push(value);
            }

            let index = sqlBuild.lastIndexOf(",");
            let sql = sqlBuild.substring(0,index);
            sql += 'WHERE `ID` = ?';

            db.query(sql, [...vals, id], (err, results) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                output = {
                    status: 'OK',
                    updatedSettingsRows: results.affectedRows
                };
                res.send(output);
            })
        })
    })
};