module.exports = (app, db) => {
    app.post('/removeProfilePic', (req, res) => {
        let {id} = req.headers;
        db.connect(() => {
            let sql = "SELECT COUNT(*) AS `count` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'";
            db.query(sql, [id], (err, countData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(countData[0].count > 0) {
                    let sql2 = "DELETE FROM `media` WHERE `accountID` = ? AND mediaType = 'profile'";
                    db.query(sql2, [id], (err, removeData) => {
                        if(err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        res.send('OK');
                    })
                } else {
                    res.send('no profile picture')
                }
            })
        })
    })
}