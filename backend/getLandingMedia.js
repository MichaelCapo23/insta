module.exports = (app, db) => {
    app.post('/getLandingMedia', (req, res) => {
        let output = [];
        let {token} = req.headers;
        let sql = "SELECT `ID` from `accounts` WHERE `token` = ?";
        db.connect(() => {
            db.query(sql, token, (err, data) => {
                if(!err) {
                    let id = data[0].ID;
                    let sql2 = "SELECT `followAccount` FROM `followers` WHERE accountID = ?";
                    db.query(sql2, id, (err, data) => {
                        if(!err) {
                            let followerIDArr = [];
                            let followerIDString = '';
                            for(let i in data) {
                                followerIDArr.push(data[i].followAccount);
                            }
                            followerIDString = followerIDArr.join();
                            let sql3 = "SELECT `m`.`ID`,`m`.`fileName`,`m`.`accountID`, `a`.`username`  FROM `media` AS m JOIN `accounts` AS a ON(`m`.`accountID` = `a`.`ID`) WHERE `m`.`accountID` in (?) and `m`.`mediaType` = 'post'";
                            db.query(sql3, followerIDString, (err, mediaData) => {
                                if(!err) {
                                    for(let index in mediaData) {
                                        let rowInfo = {
                                            comments: {},
                                            likes: 0,
                                            posterUsername: '',
                                            fileName: '',
                                            lastLikedUsername: '',
                                            lastLikedFileName: 'default.png',
                                        };
                                        let currentMediaID = mediaData[index].ID;
                                        let sql4 = "SELECT `c`.`comment`, `c`.`mediaID`, `a`.`username` FROM `comments` AS c JOIN `accounts` AS a ON (`c`.`accountID` = `a`.`ID`) WHERE `mediaID` = ?";
                                        db.query(sql4, currentMediaID, (err, comments) => {
                                            if(!err) {
                                                for(let i in comments) {
                                                    rowInfo.comments = {comment: comments[i].comment, mediaID: comments[i].mediaID, commenter: comments[i].username};
                                                }
                                                let sql5 = "SELECT count(*) AS `likes` FROM `likes` WHERE mediaID = ?";
                                                db.query(sql5, currentMediaID, (err, likesData) => {
                                                    if(!err) {
                                                        let sql6 = "SELECT `l`.`accountID`, `a`.`username` FROM `accounts` AS a JOIN `likes` AS l ON (`a`.`ID` = `l`.`accountID`) WHERE `l`.`mediaID` = '3'  ORDER BY `l`.`created_at` DESC LIMIT 1";
                                                        db.query(sql6, currentMediaID, (err, lastLiked) => {
                                                            if(!err) {
                                                                let lastLikedID = lastLiked[0].accountID;
                                                                let sql7 = "SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'";
                                                                db.query(sql7, lastLikedID, (err, lastLikedProfilePic) => {
                                                                    if(!err) {
                                                                        if(lastLikedProfilePic.length > 0) {
                                                                            rowInfo.lastLikedFileName = lastLikedProfilePic[0].fileName;
                                                                        }
                                                                        let posterID = mediaData[index].accountID;
                                                                        let sql8 = "SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'";
                                                                        db.query(sql8, posterID, (err, posterFileName) => {
                                                                            if(!err) {
                                                                                if(posterFileName.length > 0) {
                                                                                    rowInfo.posterFileName = posterFileName[0].fileName;
                                                                                }

                                                                                rowInfo.likes = likesData[0].likes;
                                                                                rowInfo.posterUsername = mediaData[index].username;
                                                                                rowInfo.fileName = mediaData[index].fileName;
                                                                                rowInfo.lastLikedUsername = lastLiked[0].username;
                                                                                output.push(rowInfo);
                                                                                if(index == (mediaData.length -1)) {
                                                                                    res.send(output);
                                                                                }
                                                                            }
                                                                        });
                                                                    } else {
                                                                        let message = 'Query Error (7) --getLandingMedia';
                                                                        res.send(message);
                                                                    }
                                                                })
                                                            } else {
                                                                let message = 'Query Error (6) --getLandingMedia';
                                                                res.send(message);
                                                            }
                                                        })
                                                    } else {
                                                        let message = 'Query Error (5) --getLandingMedia';
                                                        res.send(message);
                                                    }
                                                })
                                            } else {
                                                let message = 'Query Error (4) --getLandingMedia';
                                                res.send(message);
                                            }
                                        });
                                    }
                                } else {
                                    let message = 'Query Error (3) --getLandingMedia';
                                    res.send(message);
                                }
                            })
                        } else {
                            let message = 'Query Error (2) --getLandingMedia';
                            res.send(message);
                        }
                    })
                } else {
                    let message = 'Query Error (1) --getLandingMedia';
                    res.send(message);
                }
            })
        })
    })
};

//SELECT `ID`,`fileName`,`accountID` FROM `media` WHERE`accountID` in (?) and `mediaType` = 'post'