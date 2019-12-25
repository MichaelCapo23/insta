module.exports = (app, db) => {
    app.post('/getStories', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};

        let sql = "SELECT `followAccount` FROM `followers` WHERE `accountID` = ?";
        db.connect(() => {
            let followIDs = [];
            db.query(sql, id, (err, followingListData) => {
                if(!err) {
                    for(let followingIndex in followingListData) {
                        let currentFollowID = followingListData[followingIndex].followAccount;
                        followIDs.push(currentFollowID)
                    }
                    let sql2 = "SELECT `m`.`fileName`, `m`.`mediaType`, `a`.`username`, `a`.`name`, `a`.`ID` FROM `media` AS m JOIN `accounts` AS a ON (`m`.`accountID` = `a`.`ID`) WHERE `accountID` in (?) AND (`m`.`mediaType` = 'profile' OR `m`.`mediaType` = 'story')";
                    followIDs = followIDs.join();
                    console.log('followIDs:'+followIDs);
                    db.query(sql2, followIDs, (err, data) => {
                        if(err) throw err;
                        output = {
                            status: 'OK',
                            stories: data,
                        }
                        res.send(output)
                    })
                } else {
                    console.log('Query Error (1) --get stories service');
                    // res.send(output);
                }
            });


        })

    })
}

//let sql2 = "SELECT `accountID`, `fileName`, `mediaType` FROM `media` WHERE `accountID` in ?";