module.exports = (app, db) => {
    app.post('/exploreMedia', (req, res) => {
        let output = {status:'OK'};
        let {id} = req.headers;
        db.connect(() => {
            let sql = "SELECT DISTINCT `ID` FROM `accounts` WHERE `ID` != ?";
            db.query(sql, id, (err, otherUsersData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                let otherUsersDataArr = [];
                for(let i in otherUsersData) {
                    otherUsersDataArr.push(otherUsersData[i].ID);
                }

                let sql2 = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
                db.query(sql2, id, (err, userFollowsData) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }

                    let userFollowsDataArr = [];
                    for(let i in userFollowsData) {
                        userFollowsDataArr.push(userFollowsData[i].followAccount);
                    }

                    let userNotFollowingArr = otherUsersDataArr.filter((item) => {
                        return userFollowsDataArr.indexOf(item) == -1;
                    });
                    if(userNotFollowingArr.length > 0) {
                        let sql3 = "SELECT `ID`, `accountID`, `fileName` FROM `media` WHERE `accountID` IN (?) AND mediaType = 'post'";
                        db.query(sql3, [userNotFollowingArr], (err, nonFollowMediaData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }

                            for(let mediaObj in nonFollowMediaData) {
                                let sql4 = "SELECT (SELECT COUNT(*)  FROM `likes` WHERE `mediaID` = ?) AS `likes`, (SELECT COUNT(*) AS `comments` FROM `comments` WHERE `mediaID` = ?) AS `comments`";
                                let currentMediaID = nonFollowMediaData[mediaObj].ID;
                                db.query(sql4, [currentMediaID,currentMediaID], (err, commentsLikesData) => {
                                    if(err) {
                                        console.log(err);
                                        res.sendStatus(500);
                                        return;
                                    }
                                    nonFollowMediaData[mediaObj]['likes'] = commentsLikesData[0].likes;
                                    nonFollowMediaData[mediaObj]['comments'] = commentsLikesData[0].comments;
                                    if(mediaObj == (nonFollowMediaData.length - 1)) {
                                        res.send(nonFollowMediaData);
                                        return;
                                    }
                                })
                            }
                        })
                    } else {
                        //get random media data here
                        let sqlRandom = "SELECT `ID`, `accountID`, `fileName` FROM `media` WHERE `mediaType` = 'post' ORDER BY `created_at` LIMIT 50";
                        db.query(sqlRandom, (err, randomMediaData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }

                            for(let currentMedia in randomMediaData) {
                                let currentMediaID = randomMediaData[currentMedia].ID;
                                let sqlLikesCommentsRandom = "SELECT (SELECT COUNT(*)  FROM `likes` WHERE `mediaID` = ?) AS `likes`, (SELECT COUNT(*) AS `comments` FROM `comments` WHERE `mediaID` = ?) AS `comments`";
                                db.query(sqlLikesCommentsRandom, [currentMediaID,currentMediaID], (err, randomMediaCommentsLikesData) => {
                                    if(err) {
                                        console.log(err);
                                        res.sendStatus(500);
                                        return;
                                    }
                                    randomMediaData[currentMedia]['likes'] = randomMediaCommentsLikesData[0].likes;
                                    randomMediaData[currentMedia]['comments'] = randomMediaCommentsLikesData[0].comments;
                                    if(currentMedia == (randomMediaData.length - 1)) {
                                        res.send(randomMediaData);
                                        return;
                                    }
                                })
                            }

                        })


                        // output = {
                        //     status: 'OK',
                        //     exploreMediaList: [],
                        // };
                        // res.send(output);
                        // return;
                    }
                });
            })
        })
    })
};

//module.exports = (app, db) => {
//     app.post('/exploreMedia', (req, res) => {
//         let output = {status:'OK'};
//         let {id} = req.headers;
//         db.connect(() => {
//             let sql = "SELECT DISTINCT `ID` FROM `accounts` WHERE `ID` != ?";
//             db.query(sql, id, (err, otherUsersData) => {
//                 if(err) {
//                     console.log(err);
//                     res.sendStatus(500);
//                     return;
//                 }
//
//                 let otherUsersDataArr = [];
//                 for(let i in otherUsersData) {
//                     otherUsersDataArr.push(otherUsersData[i].ID);
//                 }
//
//                 let sql2 = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
//                 db.query(sql2, id, (err, userFollowsData) => {
//                     if(err) {
//                         console.log(err);
//                         res.sendStatus(500);
//                         return;
//                     }
//
//                     let userFollowsDataArr = [];
//                     for(let i in userFollowsData) {
//                         userFollowsDataArr.push(userFollowsData[i].followAccount);
//                     }
//
//                     let userNotFollowingArr = otherUsersDataArr.filter((item) => {
//                         return userFollowsDataArr.indexOf(item) == -1;
//                     });
//                     if(userNotFollowingArr.length > 0) {
//                         let sql3 = "SELECT `ID`, `accountID`, `fileName` FROM `media` WHERE `accountID` IN (?) AND mediaType = 'post'";
//                         db.query(sql3, [userNotFollowingArr], (err, nonFollowMediaData) => {
//                             if(err) {
//                                 console.log(err);
//                                 res.sendStatus(500);
//                                 return;
//                             }
//                             // res.send(nonFollowMediaData);
//                             // return;
//
//                             for(let mediaObj in nonFollowMediaData) {
//                                 let sql4 = "SELECT COUNT(*) AS `likes` FROM `likes` WHERE `mediaID` = ? UNION SELECT COUNT(*) AS `comments` FROM `comments` WHERE `mediaID` = ?";
//                                 let currentMediaID = nonFollowMediaData[mediaObj].ID;
//                                 db.query(sql4, [currentMediaID,currentMediaID], (err, commentsLikesData) => {
//                                     if(err) {
//                                         console.log(err);
//                                         res.sendStatus(500);
//                                         return;
//                                     }
//                                     nonFollowMediaData[mediaObj]['likes'] = commentsLikesData[0].likes;
//                                     nonFollowMediaData[mediaObj]['comments'] = commentsLikesData[0].comments;
//                                     if(mediaObj == (nonFollowMediaData.length - 1)) {
//                                         res.send(nonFollowMediaData);
//                                         return;
//                                     }
//                                 })
//                             }
//                         })
//                     } else {
//                         output = {
//                             status: 'OK',
//                             exploreMediaList: [],
//                         };
//                         res.send(output);
//                         return;
//                     }
//                 });
//             })
//         })
//     })
// };