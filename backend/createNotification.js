module.exports = (app, db) => {
    app.post('/createNotification', (req, res) => {
        let {fromid, toid, type, mediaid} = req.headers;
        db.connect(() => {
            let sql = "SELECT COUNT(*) AS `count` FROM `notifications` WHERE `accountID` = ? AND notificationFromID = ? AND notificationType = ? AND mediaID = ?";
            db.query(sql, [toid, fromid, type, mediaid], (err, countData) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(countData[0].count > 0) {
                    res.send('Notification Already Exists');
                } else {
                    let sql = "INSERT INTO `notifications` (`accountID`, `notificationFromID`, `notificationType`, `mediaID`) VALUES (?, ?, ?, ?)";
                    db.query(sql, [toid, fromid, type, mediaid], (err, data) => {
                        if(err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        let insertID = data.insertId;
                        res.send(JSON.stringify(insertID));
                    })
                }
            })
        })
    })
};



