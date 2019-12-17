module.exports = (app, db) => {
    app.post('/getLandingMedia', (req, res) => {
        let output = [];
        let {token} = req.headers;
        let sql = "SELECT `ID` from `accounts` WHERE `token` = ?";
        db.connect(() => {
            db.query(sql, token, (err, data) => {
                if(!err) {
                    let id = data[0].ID;
                    let sql2 = "SELECT `followAccount` FROM `followers` WHERE accountID = ?";
                    db.query(sql2, id, (err, data) => {
                        if(!err) {
                            let followerIDArr = [];
                            let followerIDString = '';
                            for(let i in data) {
                                followerIDArr.push(data[i].followAccount);
                            }
                            followerIDString = followerIDArr.join();
                            let sql3 = "SELECT `ID`,`fileName`,`accountID` FROM `media` WHERE`accountID` in (?)";
                            db.query(sql3, followerIDString, (err, mediaData) => {
                                if(!err) {
                                    for(let index in mediaData) {
                                        let rowInfo = {};
                                        let currentMediaID = mediaData[index].ID
                                        let sql4 = "SELECT `accountID`, `comment`, `mediaID` FROM `comments` WHERE `mediaID` = ?";
                                        db.query(sql4, currentMediaID, (err, comments) => {
                                            if(!err) {
                                                for(let i in comments) {
                                                    rowInfo.comments = {comment: comments[i].comment, mediaID: comments[i].mediaID, commenterID: comments[i].accountID};
                                                }
                                                let sql5 = "SELECT count(*) AS `likes` FROM `likes` WHERE mediaID = ?";
                                                db.query(sql5, currentMediaID, (err, data) => {
                                                    if(!err) {
                                                        rowInfo.likes = data[0].likes;
                                                        rowInfo.posterID = mediaData[index].accountID;
                                                        rowInfo.fileName = mediaData[index].fileName;
                                                        output.push(rowInfo);
                                                        if(index == (mediaData.length -1)) {
                                                            res.send(output);
                                                        }
                                                    }
                                                })
                                            }
                                        });
                                    }
                                } else {
                                    let message = 'Query Error (3) --getLandingMedia';
                                    res.send(message);
                                }
                            })
                        } else {
                            let message = 'Query Error (2) --getLandingMedia';
                            res.send(message);
                        }
                    })
                } else {
                    let message = 'Query Error (1) --getLandingMedia';
                    res.send(message);
                }
            })
        })
    })
};