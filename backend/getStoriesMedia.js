module.exports = (app, db) => {
    app.post('/getStoriesMedia', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};
        let followIDs = [];
        let userStories = [];
        let currentUserStories = [];
        let allMediaData = [];
        let allMediaFinalArr = [];

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
                                allMediaData.push(mediaData[i]);
                            }
                            if(followerID == (followIDs.length - 1)) {
                                for (let index in allMediaData) {
                                    let currentStory = allMediaData[index];
                                    let currentMediaID = currentStory.mediaID;
                                    let sql3 = "SELECT COUNT(*) AS `hasIndex` FROM `viewed_stories` WHERE `mediaID` = ?";
                                    db.query(sql3, currentMediaID, (err, viewedData) => {
                                        if (err) {
                                            console.log(err);
                                            res.sendStatus(500);
                                            return;
                                        }

                                        if (viewedData[0]['hasIndex'] == 0) { //this would be where it messes up check here
                                            currentUserStories.push(allMediaData[index]);
                                            userStories.push(allMediaData[index]);
                                        }

                                        if (followerID == (followIDs.length - 1) && index == (allMediaData.length - 1)) {
                                            let sorted = {};
                                            for(let i = 0; i < userStories.length; i++ ){
                                                if( sorted[userStories[i].ID] == undefined ){
                                                    sorted[userStories[i].ID] = [];
                                                }
                                                sorted[userStories[i].ID].push(userStories[i]);
                                            }

                                            Object.entries(sorted).forEach(([key, value]) => {
                                                allMediaFinalArr.push(sorted[key]);
                                            });

                                            output = {
                                                status: 'OK',
                                                stories: allMediaFinalArr,
                                            };
                                            res.send(output);
                                            return;
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