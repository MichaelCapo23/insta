module.exports = (app, db) => {
    app.post('/singlePostInfo', (req, res) => {
        let {postid} = req.headers;
        db.connect(() => {
            let sql = "SELECT `accountID`, `fileName` FROM `media` WHERE `ID` = ?";
            db.query(sql, [postid,postid], (err, mediaData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                let userID = mediaData[0].accountID;
                let sql2 = "SELECT `username`, `name`, IFNULL((SELECT `fileName` FROM `media` WHERE `ID` = ? AND `mediaType` = 'profile' ORDER BY `created_at` LIMIT 1), 'default') AS `profileFileName` FROM `accounts` WHERE `ID` = ?";
                db.query(sql2, [userID,userID], (err, accountData) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }

                    let outputObj = {
                        accountID: userID,
                        mediaFileName: mediaData[0].fileName,
                        profileFileName: accountData[0].profileFileName,
                        username: accountData[0].username,
                        name: accountData[0].name,
                    };
                    res.send(outputObj);
                })
            })
        })
    })
};