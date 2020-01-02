module.exports = (app, db) => {
    app.post('/getStoriesMedia', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};
        let followIDs = [];
        let userStories = [];
        let userStoriesIndex = 0;

        let sql = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
        db.connect(() => {
            db.query(sql, id, (err, followingListData) => {
                if(!err) {
                    for(let followingIndex in followingListData) {
                        let currentFollowID = followingListData[followingIndex].followAccount;
                        followIDs.push(currentFollowID)
                    }
                    for (let followerID in followIDs) {
                        let sql2 = "SELECT `m`.`ID` AS `mediaID`, `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID`, (SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile' LIMIT 1) AS `profileFileName` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND `m`.`mediaType` = 'story' ORDER BY `m`.`created_at`";
                        let followID = followIDs[followerID];
                        db.query(sql2, [followID, followID], (err, data) => {
                            if(err) throw err;
                            let removeIDs = [];
                            let dataLength = data.length;
                            for(let index in data) {
                                let currentStory = data[index];
                                let currentMediaID = currentStory.mediaID;
                                let sql3 = "SELECT COUNT(*) AS `hasIndex` FROM `viewed_stories` WHERE `mediaID` = ?";
                                db.query(sql3, currentMediaID, (err, viewedData) => {
                                    if(err) throw err;
                                    if(viewedData[0]['hasIndex'] != 0) {
                                        removeIDs.push(index);
                                    }
                                    if(index == (data.length -1)) {
                                        for (let i = removeIDs.length -1; i >= 0; i--) {
                                            data.splice(removeIDs[i],1);
                                        }
                                        if(data.length != 0 && data != null) {
                                            userStories[userStoriesIndex] = data;
                                            ++userStoriesIndex;
                                        }
                                    }
                                    if(!data) {
                                        if(followerID == (followIDs.length - 1)) {
                                            output = {
                                                status: 'OK',
                                                stories: userStories,
                                            };
                                            res.send(output)
                                        }
                                    } else {
                                        if(followerID == (followIDs.length - 1) && index == (dataLength - 1)) {
                                            output = {
                                                status: 'OK',
                                                stories: userStories,
                                            };
                                            res.send(output)
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            });
        })
    })
};

// userStories[followerID] = data;
// if(followerID == followIDs.length -1) {
//     output = {
//         status: 'OK',
//         stories: userStories,
//     };
//     res.send(output)
//
// }

//let sql3 = "SELECT COUNT(*) FROM `media` as m JOIN `viewed_stries` AS vs ON (`m`.`ID` = `vs`.`mediaID`) WHERE `vs`"



//module.exports = (app, db) => {
//     app.post('/getStoriesMedia', (req, res) => {
//         let {id} = req.headers;
//         let output = {status: 'NO'};
//         let followIDs = [];
//         let userStories = [];
//
//         let sql = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
//         db.connect(() => {
//             db.query(sql, id, (err, followingListData) => {
//                 if(!err) {
//                     for(let followingIndex in followingListData) {
//                         let currentFollowID = followingListData[followingIndex].followAccount;
//                         followIDs.push(currentFollowID)
//                     }
//                     for (let followerID in followIDs) {
//                         let sql2 = "SELECT `m`.`iD` AS `mediaID`, `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID`, (SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile' LIMIT 1) AS `profileFileName` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND `m`.`mediaType` = 'story' ORDER BY `m`.`created_at`";
//                         let followID = followIDs[followerID];
//                         db.query(sql2, [followID, followID], (err, data) => {
//                             if(err) throw err;
//                             userStories[followerID] = data;
//                             if(followerID == followIDs.length -1) {
//                                 output = {
//                                     status: 'OK',
//                                     stories: userStories,
//                                 };
//                                 res.send(output)
//
//                             }
//                         })
//                     }
//                 } else {
//                     console.log('Query Error (1) --get stories service');
//                 }
//             });
//         })
//     })
// };