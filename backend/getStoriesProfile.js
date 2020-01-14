module.exports = async (app, db) => {
    app.post('/getStoriesProfile', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};
        let followIDs = [];
        let userStories = [];
        let userStoriesIndex = 0;
        //get all the accounts this account follows
        let sql = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
        db.connect(() => {
            db.query(sql, id, (err, followingListData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                for(let followingIndex in followingListData) {
                    let currentFollowID = followingListData[followingIndex].followAccount;
                    followIDs.push(currentFollowID)
                }
                for (let followerID in followIDs) {
                    //get all the media from the current account
                    let sql2 = "SELECT `ID` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'story'";
                    let followID = followIDs[followerID];
                    db.query(sql2, followID, (err, allUserStories) => {
                        let storiesArr = [];
                        if(allUserStories.length > 0) {
                            for (let i in allUserStories) {
                                storiesArr.push(allUserStories[i].ID);
                            }
                        } else {
                            output = {
                                status: 'OK',
                                stories: userStories,
                            };
                            res.send(output);
                            return;
                        }
                        let sql3 = "SELECT COUNT(*) AS `viewed_story` FROM `viewed_stories` WHERE `accountID` = ? AND `mediaID` IN (?)";
                        db.query(sql3, [id, storiesArr], (err, viewed_count) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            let sql4 = "SELECT `m`.`ID` AS `mediaID`, `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID`, (SELECT `created_at` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'story' ORDER BY `created_at` DESC LIMIT 1) AS `storyCreatedAt` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND `m`.`mediaType` = 'profile' ORDER BY `m`.`created_at`";
                            db.query(sql4, [followID, followID], (err, data) => {
                                if(err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                } else {
                                    if(viewed_count[0].viewed_story < allUserStories.length) {
                                        userStories[userStoriesIndex] = data;
                                        userStoriesIndex++;
                                    }
                                    if(followerID == followIDs.length - 1) {
                                        output = {
                                            status: 'OK',
                                            stories: userStories,
                                        };
                                        res.send(output);
                                        return;
                                    }
                                }
                            });
                        })
                    })
                }
            });
        })
    })
};