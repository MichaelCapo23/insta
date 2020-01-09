module.exports = (app, db) => {
    app.post('/suggestedFollows', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};
        let suggestedDataArr = [];
        db.connect(() => {
            let sql = "SELECT DISTINCT `accountID` FROM `followers` WHERE `followAccount` = ?";
            db.query(sql, id, (err, followsUserData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                let followsUserArr = [];
                for(let i in followsUserData) {
                    followsUserArr.push(followsUserData[i].accountID);
                }
                let sql2 = "SELECT DISTINCT `followAccount` FROM `followers` WHERE `accountID` = ?";
                db.query(sql2, id, (err, userFollowsData) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }
                    let userFollowsArr = [];
                    for(let i in userFollowsData) {
                        userFollowsArr.push(userFollowsData[i].followAccount);
                    }
                    let suggestedValuesArr = followsUserArr.filter((value) => {
                        return userFollowsArr.indexOf(value) == -1;
                    });
                    if(suggestedValuesArr.length <= 0) {
                        output = {
                            status: 'OK',
                            suggestedList: [],
                        };
                        res.send(output);
                    }
                    for(let suggested in suggestedValuesArr) {
                        let sql3 = "SELECT `username`, (IFNULL( (SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'), 'default') ) AS `fileName` FROM `accounts` WHERE `ID` = ?";
                        let suggestedUser = suggestedValuesArr[suggested];
                        db.query(sql3, [suggestedUser,suggestedUser], (err, suggestedData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            suggestedDataArr.push(suggestedData[0]);
                            if(suggested == (suggestedValuesArr.length - 1)) {
                                output = {
                                    status: 'OK',
                                    suggestedList: suggestedDataArr,
                                };
                                res.send(output);
                            }
                        })
                    }
                })
            })
        })
    })
};