module.exports = (app, db) => {
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
                if(err) throw err;
                for(let followingIndex in followingListData) {
                    let currentFollowID = followingListData[followingIndex].followAccount;
                    followIDs.push(currentFollowID)
                }
                for (let followerID in followIDs) {
                    //get all the media from the current account
                    let sql2 = "SELECT `ID` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'story'";
                    let followID = followIDs[followerID];
                    db.query(sql2, followID, (err, allUserStories) => {
                        let viewedCount = 0;
                        for(let story in allUserStories) {
                            let sql3 = "SELECT COUNT(*) AS `viewed_story` FROM `viewed_stories` WHERE `accountID` = ? AND `mediaID` = ?";
                            let currentStory = allUserStories[story].ID;
                            db.query(sql3, [id, currentStory], (err, viewed_story_data) => {
                                if(err) throw err;
                                if(viewed_story_data[0].viewed_story != 0) {
                                    viewedCount++;
                                }
                                if((story == (allUserStories.length - 1)) && (viewedCount != allUserStories.length)) {
                                    let sql4 = "SELECT `m`.`ID` AS `mediaID`, `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID`, (SELECT `created_at` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'story' ORDER BY `created_at` DESC LIMIT 1) AS `storyCreatedAt` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND `m`.`mediaType` = 'profile' ORDER BY `m`.`created_at`";
                                    db.query(sql4, [followID, followID], (err, data) => {
                                        userStories[userStoriesIndex] = data;
                                        userStoriesIndex++;
                                        if(followerID == (followIDs.length -1)) {
                                            output = {
                                                status: 'OK',
                                                stories: userStories,
                                            };
                                            console.log('userStories58: '+JSON.stringify(userStories, null, 2));
                                            res.send(output);
                                        }
                                    })
                                } else {
                                    if(followerID == (followIDs.length - 1)) {
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
            });
        })
    })
};