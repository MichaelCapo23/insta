module.exports = (app, db) => {
    app.post('/getStoriesMedia', (req, res) => {
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
                        let sql2 = "SELECT `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID`, (SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile' LIMIT 1) AS `profileFileName` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND `m`.`mediaType` = 'story' ORDER BY `m`.`created_at`";
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