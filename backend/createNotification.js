module.exports = (app, db) => {
    app.post('/createNotification', (req, res) => {
        let {id, notificationID} = req.headers;
        let {type} = req.body;
        db.connect(() => {
            let sql = "INSERT INTO `notifications` (`accountID`, `notificationFromID`, `notificationType`) VALUES (?, ?, ?)";
            db.query(sql, [id, notificationID, type], (err, data) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                res.send(res);
            })
        })
    })
};