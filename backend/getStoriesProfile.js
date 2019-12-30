module.exports = (app, db) => {
    app.post('/getStoriesProfile', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};
        let followIDs = [];
        let userStories = [];

        let sql = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
        db.connect(() => {
            db.query(sql, id, (err, followingListData) => {
                if(!err) {
                    for(let followingIndex in followingListData) {
                        let currentFollowID = followingListData[followingIndex].followAccount;
                        followIDs.push(currentFollowID)
                    }
                    for (let followerID in followIDs) {
                        let sql2 = "SELECT `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID`, (SELECT `created_at` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'story' ORDER BY `created_at` DESC LIMIT 1) AS `storyCreatedAt` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = '2' AND `m`.`mediaType` = 'profile' ORDER BY `m`.`created_at`";
                        let followID = followIDs[followerID];
                        db.query(sql2, [followID, followID], (err, data) => {
                            if(err) throw err;
                            userStories[followerID] = data;
                            if(followerID == followIDs.length -1) {
                                output = {
                                    status: 'OK',
                                    stories: userStories,
                                };
                                res.send(output)

                            }
                        })
                    }
                } else {
                    console.log('Query Error (1) --get stories service');
                }
            });
        })
    })
};

// module.exports = (app, db) => {
//     app.post('/getStories', (req, res) => {
//         let {id} = req.headers;
//         let output = {status: 'NO'};
//         let userStories = [];
//
//         let sql = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
//         db.connect(() => {
//             db.query(sql, id, (err, followingListData) => {
//                 if(!err) {
//                     for(let followingIndex in followingListData) {
//                         let currentFollowID = followingListData[followingIndex].followAccount;
//                         let sql2 = "SELECT `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND `m`.`mediaType` = 'profile' ORDER BY `m`.`created_at`";
//                         db.query(sql2, [currentFollowID], (err, data) => {
//                             if(err) throw err;
//                             userStories[followerID] = data;
//                             if(Number(followingIndex) == followingListData.length -1) {
//                                 output = {
//                                     status: 'OK',
//                                     stories: userStories,
//                                 };
//                                 res.send(output)
//
//                             }
//                         })
//
//                     }
//                 } else {
//                     console.log('Query Error (1) --get stories service');
//                 }
//             });
//         })
//     })
// };
//
