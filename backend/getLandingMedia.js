module.exports = (app, db) => {
    app.post('/getLandingMedia', (req, res) => {
        let output = [];
        let {id} = req.headers;
        db.connect(() => {
            let sql2 = "SELECT `followAccount` FROM `followers` WHERE accountID = ?";
            db.query(sql2, id, (err, data) => {
                if(!err) {
                    let followerIDArr = [];
                    for(let i in data) {
                        followerIDArr.push(data[i].followAccount);
                    }

                    if(data.length === 0) {
                        output = {
                            status: 'NO',
                            rowinfo: {
                                comments: [],
                                likes: 0,
                                posterUsername: '',
                                fileName: '',
                                lastLikedUsername: '',
                                lastLikedFileName: 'default.png',
                                posterFileName: ''
                            }
                        };
                        res.send(output);
                        return;
                    }

                    let followerIDString = [followerIDArr];
                    let sql3 = "SELECT `m`.`ID`,`m`.`fileName`,`m`.`accountID`, `a`.`username`  FROM `media` AS m JOIN `accounts` AS a ON(`m`.`accountID` = `a`.`ID`) WHERE `m`.`accountID` in (?) and `m`.`mediaType` = 'post'";
                    db.query(sql3, followerIDString, (err, mediaData) => {
                        if(!err) {
                            for(let index in mediaData) {
                                let rowInfo = {
                                    comments: [],
                                    likes: 0,
                                    posterUsername: '',
                                    fileName: '',
                                    lastLikedUsername: '',
                                    lastLikedFileName: 'default.png',
                                };
                                let currentMediaID = mediaData[index].ID;
                                let sql4 = "SELECT `c`.`comment`, `c`.`mediaID`, `a`.`username` FROM `comments` AS c JOIN `accounts` AS a ON (`c`.`accountID` = `a`.`ID`) WHERE `mediaID` = ? ORDER BY `c`.`created_at`";
                                db.query(sql4, currentMediaID, (err, comments) => {
                                    if(!err) {
                                        for(let i in comments) {
                                            rowInfo.comments.push({comment: comments[i].comment, mediaID: comments[i].mediaID, commenter: comments[i].username});
                                        }
                                        let sql5 = "SELECT count(*) AS `likes`, (SELECT count(*) FROM `likes` WHERE `accountID` = ? AND mediaID = ?) as userLiked FROM `likes` WHERE mediaID = ?";
                                        db.query(sql5, [id, currentMediaID, currentMediaID], (err, likesData) => {
                                            if(!err) {
                                                let sql6 = "SELECT `l`.`accountID`, `a`.`username` FROM `accounts` AS a JOIN `likes` AS l ON (`a`.`ID` = `l`.`accountID`) WHERE `l`.`mediaID` = ?  ORDER BY `l`.`created_at` DESC LIMIT 1";
                                                db.query(sql6, currentMediaID, (err, lastLiked) => {
                                                    if(!err) {
                                                        let lastLikedID = 'none';
                                                        if(lastLiked.length > 0) {
                                                            lastLikedID = lastLiked[0].accountID;
                                                        }
                                                        let sqlSaved = "SELECT COUNT(*) AS `saved` FROM `saved_media` WHERE `accountID` = ? AND `mediaID` = ?";
                                                        db.query(sqlSaved, [id, currentMediaID], (err, savedData) => {
                                                            if(err) {
                                                                console.log(err);
                                                                res.sendStatus(500);
                                                                return;
                                                            }
                                                            let userSaved = savedData[0].saved;
                                                            let posterID = mediaData[index].accountID;
                                                            let sql7 = "SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'";
                                                            db.query(sql7, posterID, (err, posterFileName) => {
                                                                if(!err) {
                                                                    if (posterFileName.length > 0) {
                                                                        rowInfo.posterFileName = posterFileName[0].fileName;
                                                                    }
                                                                    let tagsArr = [];
                                                                    let sql8 = "SELECT `t`.`taggedID`, `a`.`username`  FROM `tags` AS t JOIN `accounts` AS a ON (`a`.`ID` = `t`.`taggedID`) WHERE `mediaID` = ?";
                                                                    db.query(sql8, [currentMediaID], (err, tagsData) => {
                                                                        if(err) {
                                                                            console.log(err);
                                                                            res.sendStatus(500);
                                                                            return;
                                                                        }

                                                                        for(let tag in tagsData) {
                                                                            tagsArr.push({taggedID: tagsData[tag].taggedID, taggedUsername: tagsData[tag].username});
                                                                        }

                                                                        let sql8 = "SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'";
                                                                        db.query(sql8, lastLikedID, (err, lastLikedProfilePic) => {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                res.sendStatus(500);
                                                                                return;
                                                                            }

                                                                            if (lastLikedProfilePic.length > 0) {
                                                                                rowInfo.lastLikedFileName = lastLikedProfilePic[0].fileName;
                                                                            }

                                                                            let lastLikedVal = '';
                                                                            if(lastLikedID !== 'none') {
                                                                                lastLikedVal = lastLiked[0].username;
                                                                            }
                                                                            rowInfo.posterID = posterID;
                                                                            rowInfo.likes = likesData[0].likes;
                                                                            rowInfo.userLiked = likesData[0].userLiked;
                                                                            rowInfo.mediaID = mediaData[index].ID;
                                                                            rowInfo.posterUsername = mediaData[index].username;
                                                                            rowInfo.fileName = mediaData[index].fileName;
                                                                            rowInfo.lastLikedUsername = lastLikedVal;
                                                                            rowInfo.userSaved = userSaved;
                                                                            rowInfo.tags = tagsArr;
                                                                            output.push(rowInfo);
                                                                            if (index == (mediaData.length - 1)) {
                                                                                res.send(output);
                                                                                return;
                                                                            }
                                                                        });
                                                                    })
                                                                } else {
                                                                    console.log(err);
                                                                    res.sendStatus(500);
                                                                    return;
                                                                }
                                                            })
                                                        })
                                                    } else {
                                                        console.log(err);
                                                        res.sendStatus(500);
                                                        return;
                                                    }
                                                })
                                            } else {
                                                console.log(err);
                                                res.sendStatus(500);
                                                return;
                                            }
                                        })
                                    } else {
                                        console.log(err);
                                        res.sendStatus(500);
                                        return;
                                    }
                                });
                            }
                        } else {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                    })
                } else {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
            })
        })
    })
};