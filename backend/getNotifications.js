module.exports = (app, db) => {
    app.post('/getNotifications', (req, res) => {
        let {id} = req.headers;
        db.connect(() => {
            let sql = "SELECT `ID`, `notificationFromID`, `notificationType` FROM `notifications` WHERE `accountID` = ?";
            db.query(sql, [id], (err, data) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                res.send(data);
            })
        })
    })
};