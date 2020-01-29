module.exports = (app, db) => {
    app.post('/createFollow', (req, res) => {
        let {id, followid} = req.headers;
        db.connect(() => {
            let sql = "INSERT INTO `followers` (`accountID`, `followAccount`) VALUES (?, ?)";
            db.query(sql, [id, followid], (err, data) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                let createdRowID = data.insertId;
                createdRowID = JSON.stringify(createdRowID);
                res.send(createdRowID);
            })
        })
    })
};