module.exports = (app, db) => {
    app.post('/createFollow', (req, res) => {
        let {id, followid} = req.headers;
        db.connect(() => {
            let sql = "SELECT COUNT(*) AS `count` FROM `followers` WHERE `accountID` = ? AND `followAccount` = ?";
            db.query(sql, [id, followid], (err, hasFollowData) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(hasFollowData[0].count === 0) {
                    let sql = "INSERT INTO `followers` (`accountID`, `followAccount`) VALUES (?, ?)";
                    db.query(sql, [id, followid], (err, data) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }

                        let createdRowID = data.insertId;
                        createdRowID = JSON.stringify(createdRowID);
                        res.send(createdRowID);
                    })
                } else {
                    res.send('Already Following User');
                }
            })
        })
    })
};