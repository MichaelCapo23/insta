module.exports = (app, db) => {
    app.post('/updateViewedStories', (req, res) => {
        let {id, storyids} = req.headers;
        storyids = JSON.parse(storyids);
        let insertIDs = [];
        let output = {status: 'NO'};
        db.connect(() => {
            for(let storyID in storyids) {
                let sql = "SELECT COUNT(*) AS `count` FROM `viewed_stories` WHERE `accountID` = ? AND `mediaID` = '?'";
                let currentStoryID = JSON.parse(storyids[storyID]);
                db.query(sql, [id, currentStoryID], (err, viewed_count) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }
                    let sql2 = "INSERT INTO `viewed_stories` (`accountID`, `mediaID`) VALUES (?, ?)";
                    let currentStoryID = storyids[storyID];
                    if(viewed_count[0].count === 0) {
                        db.query(sql2, [id, currentStoryID], (err, data) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            insertIDs.push(data.insertId);
                            if (Number(storyID) === storyids.length) {
                                output = {
                                    'status': 'OK',
                                    insertIDs: insertIDs
                                };
                                res.send(output);
                            }
                        })
                    } else {
                        if (Number(storyID) === storyids.length) {
                            output = {
                                'status': 'OK',
                                insertIDs: insertIDs
                            };
                            res.send(output);
                        }
                    }
                })
            }
        })
    })
};