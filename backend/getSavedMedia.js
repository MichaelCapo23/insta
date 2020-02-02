module.exports = (app, db) => {
    app.post('/getSavedMedia', (req, res) => {
        let {id} = req.headers;
        db.connect(() => {
            let sql = "SELECT `mediaID` FROM `saved_media` WHERE `accountID` = ?";
            db.query(sql, [id], (err, savedData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                if(savedData.length > 0) {
                    for(let i in savedData) {
                        let currentMediaID = savedData[i].mediaID;
                        let sql2 = "SELECT `accountID`, `fileName` FROM `media` WHERE `ID` = ?";
                        db.query(sql2, [currentMediaID], (err, mediaData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }

                            let sql3 = "SELECT count(*) as likes, (SELECT count(*) FROM `comments` WHERE mediaID = ?) AS comments FROM `likes` WHERE mediaID = ?";
                            db.query(sql3, [currentMediaID, currentMediaID], (err, mediaInfoData) => {
                                if(err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                }

                                savedData[i].posterID = mediaData[0].accountID;
                                savedData[i].fileName = mediaData[0].fileName;
                                savedData[i].likes = mediaInfoData[0].likes;
                                savedData[i].comments = mediaInfoData[0].comments;
                                if(i == (savedData.length - 1)) {
                                    res.send(savedData)
                                }
                            })
                        })
                    }
                } else {
                    res.send('');
                }
            })
        })
    })
};