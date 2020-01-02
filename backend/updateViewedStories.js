module.exports = (app, db) => {
    app.post('/updateViewedStories', (req, res) => {
        let {id, storyids} = req.headers;
        storyids = storyids.split(",");
        console.log('storyIDsArray: '+JSON.stringify(storyids, null, 2));
        let insertIDs = [];
        let output = {status: 'NO'};
        db.connect(() => {
            for(let storyID in storyids) {
                let sql = "INSERT INTO `viewed_stories` (`accountID`, `mediaID`) VALUES (?, ?)";
                let currentStoryID = storyids[storyID];
                console.log('currentStoryID: '+currentStoryID);
                db.query(sql, [id, currentStoryID], (err, data) => {
                    if(err) throw err;
                    insertIDs.push(data.insertId);
                    if(Number(storyID) === storyids.length) {
                        output = {
                            'status': 'OK',
                            insertIDs: insertIDs
                        }
                        res.send(output);
                    }
                })
            }
        })
    })
};