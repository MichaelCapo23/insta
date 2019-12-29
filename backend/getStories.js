module.exports = (app, db) => {
    app.post('/getStories', (req, res) => {
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
                        let sql2 = "SELECT `m`.`fileName`, `m`.`mediaType`, `a`.`username`, `a`.`name`, `a`.`ID` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND (`m`.`mediaType` = 'profile' OR `m`.`mediaType` = 'story') ORDER BY `m`.`created_at`";
                        let followID = followIDs[followerID];
                        db.query(sql2, followID, (err, data) => {
                            console.log(JSON.stringify(data, null, 2));
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


//module.exports = (app, db) => {
//     app.post('/getStories', (req, res) => {
//         let {id} = req.headers;
//         let output = {status: 'NO'};
//
//         let sql = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
//         db.connect(() => {
//             let followIDs = [];
//             db.query(sql, id, (err, followingListData) => {
//                 if(!err) {
//                     for(let followingIndex in followingListData) {
//                         let currentFollowID = followingListData[followingIndex].followAccount;
//                         followIDs.push(currentFollowID)
//                     }
//                     let sql2 = "SELECT `m`.`fileName`, `m`.`mediaType`, `a`.`username`, `a`.`name`, `a`.`ID` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` in (?) AND (`m`.`mediaType` = 'profile' OR `m`.`mediaType` = 'story') ORDER BY `m`.`created_at`";
//                     followIDs = [followIDs];
//                     db.query(sql2, followIDs, (err, data) => {
//                         console.log(JSON.stringify(data, null, 2));
//                         if(err) throw err;
//                         output = {
//                             status: 'OK',
//                             stories: data,
//                         }
//                         res.send(output)
//                     })
//                 } else {
//                     console.log('Query Error (1) --get stories service');
//                     // res.send(output);
//                 }
//             });
//
//
//         })
//
//     })
// }