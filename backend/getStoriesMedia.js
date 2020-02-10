module.exports = (app, db) => {
    app.post('/getStoriesMedia', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};
        let followIDs = [];
        let userStories = [];
        let userStoriesIndex = 0;
        let allMediaData = [];

        let sql = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
        db.connect(() => {
            db.query(sql, id, (err, followingListData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                for (let followingIndex in followingListData) {
                    let currentFollowID = followingListData[followingIndex].followAccount;
                    followIDs.push(currentFollowID)
                }

                if(followingListData.length > 0) {
                    for (let followerID in followIDs) {
                        let sql2 = "SELECT `m`.`ID` AS `mediaID`, `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID`, (SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile' LIMIT 1) AS `profileFileName` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND `m`.`mediaType` = 'story' ORDER BY `m`.`created_at`";
                        let followID = followIDs[followerID];
                        db.query(sql2, [followID, followID], (err, mediaData) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            for (let i in mediaData) {
                                console.log(mediaData[i]);
                                allMediaData.push(mediaData[i]);
                            }
                            if(followerID == (followIDs.length - 1)) {
                                let removeIDs = [];
                                for (let index in allMediaData) {
                                    let currentStory = allMediaData[index];
                                    let currentMediaID = currentStory.mediaID;
                                    let sql3 = "SELECT COUNT(*) AS `hasIndex` FROM `viewed_stories` WHERE `mediaID` = ?";
                                    db.query(sql3, currentMediaID, (err, viewedData) => {
                                        console.log(sql3);
                                        if (err) {
                                            console.log(err);
                                            res.sendStatus(500);
                                            return;
                                        }


                                        if (viewedData[0]['hasIndex'] != 0) {
                                            removeIDs.push(index);
                                        }

                                        if (index == (allMediaData.length - 1)) {
                                            for (let i = removeIDs.length - 1; i >= 0; i--) {
                                                allMediaData.splice(removeIDs[i], 1);
                                            }

                                            if (allMediaData.length != 0 && mediaData != null) {
                                                userStories[userStoriesIndex] = allMediaData.length;
                                                ++userStoriesIndex;
                                            }
                                        }

                                        console.log('followerID: '+followerID);
                                        console.log('(followIDs.length - 1): '+(followIDs.length - 1));
                                        console.log('index: '+index);
                                        console.log('(dataLength - 1): '+(allMediaData.length - 1));
                                        if (followerID == (followIDs.length - 1) && index == (allMediaData.length - 1)) {
                                            output = {
                                                status: 'OK',
                                                stories: userStories,
                                            };
                                            res.send(output);
                                        }
                                    })
                                }
                            }
                        });
                    }
                } else {
                    output = {
                        status: 'OK',
                        stories: userStories,
                    };
                    res.send(output);
                }
            });
        })
    })
};


//let removeIDs = [];
//                             for (let index in mediaData) {
//                                 let currentStory = mediaData[index];
//                                 let currentMediaID = currentStory.mediaID;
//                                 let sql3 = "SELECT COUNT(*) AS `hasIndex` FROM `viewed_stories` WHERE `mediaID` = ?";
//                                 db.query(sql3, currentMediaID, (err, viewedData) => {
//                                     console.log(sql3);
//                                     if (err) {
//                                         console.log(err);
//                                         res.sendStatus(500);
//                                         return;
//                                     }
//
//
//                                     if (viewedData[0]['hasIndex'] != 0) {
//                                         removeIDs.push(index);
//                                     }
//
//                                     if (index == (mediaData.length - 1)) {
//                                         for (let i = removeIDs.length - 1; i >= 0; i--) {
//                                             data.splice(removeIDs[i], 1);
//                                         }
//
//                                         if (mediaData.length != 0 && mediaData != null) {
//                                             userStories[userStoriesIndex] = mediaData.length;
//                                             ++userStoriesIndex;
//                                         }
//                                     }
//
//                                     console.log('followerID: '+followerID);
//                                     console.log('(followIDs.length - 1): '+(followIDs.length - 1));
//                                     console.log('index: '+index);
//                                     console.log('(dataLength - 1): '+(mediaData.length - 1));
//                                     if (followerID == (followIDs.length - 1) && index == (mediaData.length - 1)) {
//                                         output = {
//                                             status: 'OK',
//                                             stories: userStories,
//                                         };
//                                         res.send(output);
//                                     }
//                                 })
//                             }