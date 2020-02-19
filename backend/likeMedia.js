module.exports = (app, db) => {
    app.post('/likeMedia', (req, res) => {
        let {id} = req.headers;
        let {mediaID} = req.body;
        let output = {status: 'NO'};
        let sql = "SELECT COUNT(*) AS `count` FROM `likes` WHERE `accountID` = ? AND `mediaID` = ?";
        db.connect(() => {
            db.query(sql, [id, mediaID], (err, countData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                if(countData[0].count == 0) {
                    let sql2 = "INSERT INTO `likes` (`accountID`, `mediaID`) VALUES (?,?)";
                    db.query(sql2, [id, mediaID], (err, data) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        let insertID = data.insertId;
                        output = {
                            status: 'OK',
                            likedID: insertID
                        };
                        res.send(output);
                    });
                } else {
                    let sql3 = "DELETE FROM `likes` WHERE `accountID` = ? AND `mediaID` = ?";
                    db.query(sql3, [id, mediaID], (err, delData) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        res.send('Removed Media');
                    })
                }
            })
        })
    })
};


