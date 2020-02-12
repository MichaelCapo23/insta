module.exports = (app, db) => {
    app.post('/singlePostInfo', (req, res) => {
        let {postid, id} = req.headers;
        let comments = [];
        let likes = [];
        let tagsArr = [];
        db.connect(() => {
            let sql = "SELECT `ID`, `accountID`, `fileName`  FROM `media` WHERE `ID` = ?";
            db.query(sql, [postid,postid], (err, mediaData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                let userID = mediaData[0].accountID;
                let sql2 = "SELECT `username`, `name`, IFNULL((SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile' ORDER BY `created_at` LIMIT 1), 'default') AS `profileFileName` FROM `accounts` WHERE `ID` = ?";
                db.query(sql2, [userID,userID], (err, accountData) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }

                    let sql3 = "SELECT `accountID`, `comment`, `created_at` FROM `comments` WHERE `mediaID` = ? ORDER BY `created_at` LIMIT 50";
                    db.query(sql3, postid, (err, commentsData) => {
                        if(err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        for(let comment in commentsData) {
                            comments[comment] = commentsData[comment];
                            let currentCommentAccountID = commentsData[comment].accountID;
                            let sqlCommentUsername = "SELECT `username`, IFNULL((SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'), 'default') AS `fileName` FROM `accounts` WHERE `ID` = ?";
                            db.query(sqlCommentUsername, [currentCommentAccountID, currentCommentAccountID], (err, commentProfile) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                }
                                comments[comment].profileFileName = commentProfile[0].fileName;
                                comments[comment].username = commentProfile[0].username;
                            });
                        }
                        let sql4 = "SELECT `l`.`accountID`, `a`.`username` FROM `likes` l JOIN `accounts` a ON (`l`.`accountID` = `a`.`ID`) WHERE `mediaID` = ?";
                        db.query(sql4, [postid], (err, likesData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            for(let like in likesData) {
                                likes[like] = likesData[like];
                            }

                            let sql5 = "SELECT COUNT(*) AS `userLiked` FROM LIKES WHERE `accountID` = ? AND  `mediaID` = ?";
                            db.query(sql5, [id,postid], (err, userlikedData) => {
                                if(err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                }

                                let sql6 = "SELECT `taggedID` FROM `tags` WHERE `mediaID` = ?";
                                db.query(sql6, [postid], (err, tagsData) => {
                                    if(err) {
                                        console.log(err);
                                        res.sendStatus(500);
                                        return;
                                    }

                                    for(let tag in tagsData) {
                                        tagsArr.push(tagsData[tag].taggedID);
                                    }

                                    let outputObj = {
                                        accountID: userID,
                                        mediaID: mediaData[0].ID,
                                        mediaFileName: mediaData[0].fileName,
                                        mediaCreatedAt: mediaData[0].mediaCreatedAt,
                                        profileFileName: accountData[0].profileFileName,
                                        username: accountData[0].username,
                                        name: accountData[0].name,
                                        userLiked: userlikedData[0].userLiked,
                                        comments: comments,
                                        tags: tagsArr,
                                        likes: likes,
                                    };
                                    res.send(outputObj);
                                })
                            })
                        })
                    })
                })
            })
        })
    })
};

