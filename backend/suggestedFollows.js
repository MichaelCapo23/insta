module.exports = (app, db) => {
    app.post('/suggestedFollows', (req, res) => {
        let {id} = req.headers;
        let output = {status: 'NO'};
        let allUsersArr = [];
        let suggestedUsers = [];
        let suggestedDataArr = [];
        db.connect(() => {
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
                let sqlAllUsers = "SELECT `ID`, `username` FROM `accounts`  WHERE `ID` != ? LIMIT 50";
                db.query(sqlAllUsers, [id], (err, randomSuggestedUsers) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }

                    for(let i in randomSuggestedUsers) {
                        allUsersArr.push(randomSuggestedUsers[i]);
                    }

                    suggestedUsers = allUsersArr.filter((value) => {
                        return userFollowsArr.indexOf(value) == -1;
                    });

                    for(let i in suggestedUsers) {
                        let currentRandomUser = randomSuggestedUsers[i].ID;
                        let sqlrandomProfile = "SELECT (IFNULL((SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'), 'default')) AS `fileName`, (SELECT COUNT(*) FROM `followers` WHERE `accountID` = ? AND `followAccount` = ?) AS `followsYou`";
                        db.query(sqlrandomProfile, [currentRandomUser, currentRandomUser, id], (err, randomSuggestedUsersFileName) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            randomSuggestedUsers.push();
                            randomSuggestedUsers[i].fileName = randomSuggestedUsersFileName[0].fileName;
                            randomSuggestedUsers[i].followsYou = randomSuggestedUsersFileName[0].followsYou;
                            suggestedDataArr.push(randomSuggestedUsers[i]);

                            if(i == (randomSuggestedUsers.length - 1)) {
                                output = {
                                    status: 'OK',
                                    suggestedList: suggestedDataArr,
                                };
                                res.send(output)
                            }

                        })
                    }
                })
            })
        })
    })
};