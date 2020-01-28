module.exports = (app, db) => {
    app.post('/createNotification', (req, res) => {
        let {fromid, toid, type, mediaid} = req.headers;
        db.connect(() => {
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
        })
    })
};