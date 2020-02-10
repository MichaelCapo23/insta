module.exports = async (app, db) => {
    app.post('/getStoriesProfile', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};
        let followIDs = [];
        let userStories = [];
        let nonViewedIdArr = [];
        let storiesArr = [];
        //get all the accounts this account follows
        let sql = "SELECT DISTINCT `followAccount` FROM `followers` WHERE `accountID` = ?";
        db.connect(() => {
            db.query(sql, id, (err, followingListData) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                if(followingListData.length > 0) {
                    for (let followingIndex in followingListData) {
                        let currentFollowID = followingListData[followingIndex].followAccount;
                        followIDs.push(currentFollowID);
                        if(followingIndex == (followingListData.length - 1)) {
                            //get all the media IDs from the followIDs array
                            let sql2 = "SELECT `ID` FROM `media` WHERE `mediaType` = 'story' AND `accountID` IN (?)";
                            db.query(sql2, [followIDs], (err, allUserStories) => {
                                if(err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                }

                                if(allUserStories.length > 0) {
                                    for (let i in allUserStories) {
                                        storiesArr.push(allUserStories[i].ID);
                                        if(i == (allUserStories.length - 1)) {
                                            for(let storyID in storiesArr) {
                                                let currentStoryID = storiesArr[storyID];
                                                let sql3 = "SELECT COUNT(*) AS `viewed_story` FROM `viewed_stories` WHERE `accountID` = ? AND `mediaID` = ?";
                                                db.query(sql3, [id, currentStoryID], (err, viewed_count) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.sendStatus(500);
                                                        return;
                                                    }

                                                    if(viewed_count[0].viewed_story == 0) {
                                                        nonViewedIdArr.push(currentStoryID);
                                                    }
                                                    if(storyID == (storiesArr.length - 1)) {
                                                        let sql4 = "SELECT DISTINCT `accountID` FROM `media` WHERE `ID` IN (?)";
                                                        db.query(sql4, [nonViewedIdArr], (err, accountIDsData) => {
                                                            if (err) {
                                                                console.log(err);
                                                                res.sendStatus(500);
                                                                return;
                                                            }

                                                            for(let account in accountIDsData) {
                                                                let currentAccount = accountIDsData[account].accountID;
                                                                let sql4 = "SELECT `m`.`ID` AS `mediaID`, `m`.`fileName`, `m`.`created_at`, `a`.`username`, `a`.`name`, `a`.`ID`, (SELECT `created_at` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'story' ORDER BY `created_at` DESC LIMIT 1) AS `storyCreatedAt` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` = ? AND `m`.`mediaType` = 'profile' ORDER BY `m`.`created_at`";
                                                                db.query(sql4, [currentAccount, currentAccount], (err, posterData) => {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        res.sendStatus(500);
                                                                        return;
                                                                    }

                                                                    userStories.push(posterData);

                                                                    if(account == (accountIDsData.length - 1)) {
                                                                        output = {
                                                                            status: 'OK',
                                                                            stories: userStories,
                                                                        };
                                                                        res.send(output);
                                                                        return;
                                                                    }
                                                                });
                                                            }

                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    }
                                } else {
                                    output = {
                                        status: 'OK',
                                        stories: userStories,
                                    };
                                    res.send(output);
                                    return;
                                }
                            })
                        }
                    }
                } else {
                    output = {
                        status: 'OK',
                        stories: userStories,
                    };
                    res.send(output);
                    return;
                }
            });
        })
    })
};