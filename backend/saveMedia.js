module.exports = (app, db) => {
    app.post('/saveMedia', (req, res) => {
        let {id, mediaid} = req.headers;
        db.connect(() => {
            let sql = "SELECT COUNT(*) AS `saved` FROM `saved_media` WHERE `accountID` = ? AND `mediaID` = ?";
            db.query(sql, [id, mediaid], (err, savedData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                if(savedData[0].saved === 0) {
                    let sql2 = "INSERT INTO `saved_media` (`accountID`, `mediaID`) VALUES (?, ?)";
                    db.query(sql2, [id, mediaid], (err, data) => {
                        if(err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }

                        let savedID = data.insertId;
                        savedID = JSON.stringify(savedID);
                        res.send(savedID);
                    })
                } else {
                    res.send('Already saved');
                }
            });
        })
    })
};