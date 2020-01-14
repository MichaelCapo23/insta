module.exports = (app, db) => {
    app.post('/getNotifications', (req, res) => {
        let {id} = req.headers;
        db.connect(() => {
            let sql = "SELECT `ID`, `notificationFromID`, `notificationType`, `created_at` FROM `notifications` WHERE `accountID` = ?";
            db.query(sql, [id], (err, notificationsData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                for(let i in notificationsData) {
                    let notificationsFromID = notificationsData[i].notificationFromID;
                    let sql2 = "SELECT `username`, IFNULL((SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'), 'default') AS `profileFileName` FROM `accounts` WHERE `ID` = ?";
                    db.query(sql2, [notificationsFromID, notificationsFromID], (err, notificationUserData) => {
                        if(err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }

                        notificationsData[i].username = notificationUserData[0].username;
                        notificationsData[i].profileFileName = notificationUserData[0].profileFileName;
                        if(i == (notificationsData.length - 1)) {
                            res.send(notificationsData)
                        }
                    })
                }
                // res.send(data);
            })
        })
    })
};