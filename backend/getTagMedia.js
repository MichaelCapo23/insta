module.exports = (app, db) => {
    app.post('/getTagMedia', (req, res) => {
        let {id} = req.headers;
        let mediaArr = [];
        db.connect(() => {
            let sql = "SELECT `mediaID` FROM `tags` WHERE `taggedID` = ?";
            db.query(sql, [id], (err, tagData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(tagData.length > 0) {
                    for(let i in tagData) {
                        let currentMediaObj = {};
                        let currentMediaID = tagData[i].mediaID;
                        let sql2 = "SELECT `fileName` FROM `media` WHERE `ID` = ?";
                        db.query(sql2, [currentMediaID], (err, mediaData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }

                            let sql3 = "SELECT COUNT(*) AS `commentCount`, (SELECT COUNT(*) FROM `likes` WHERE `mediaID` = ?) AS `likeCount` FROM `comments` WHERE `mediaID` = ?";
                            db.query(sql3, [currentMediaID, currentMediaID], (err, mediaCountData) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                }

                                currentMediaObj.mediaID = currentMediaID;
                                currentMediaObj.fileName = mediaData[0].fileName;
                                currentMediaObj.comments = mediaCountData[0].commentCount;
                                currentMediaObj.likes = mediaCountData[0].likeCount;
                                mediaArr.push(currentMediaObj);

                                if(i == (tagData.length - 1)) {
                                    res.send(mediaArr);
                                }
                            })
                        })
                    }
                } else {
                    res.send(mediaArr);
                }
            })
        })
    })
};