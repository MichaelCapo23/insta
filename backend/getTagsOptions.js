module.exports = (app, db) => {
    app.post('/getTagsOptions', (req ,res) => {
        let {id} = req.headers;
        let tagsOptions = [];
        db.connect(() => {
            let sql = "SELECT `accountID` FROM `followers` WHERE `followAccount` = ?";
            db.query(sql, [id], (err, followData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(followData.length > 0) {
                    for(let i in followData) {
                        let tagsOptionsObj = {};
                        let currentFollowerID = followData[i].accountID;
                        tagsOptionsObj.value = currentFollowerID;

                        let sql2 = "SELECT `username` FROM `accounts` WHERE `ID` = ?";
                        db.query(sql2, [currentFollowerID], (err, accountData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            tagsOptionsObj.label = accountData[0].username;
                            tagsOptions.push(tagsOptionsObj);

                            if(i == (followData.length - 1)) {
                                res.send(tagsOptions)
                            }
                        })
                    }
                } else {
                    res.send(tagsOptions);
                }
            })
        })
    })
};