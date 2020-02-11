module.exports = (app, db) => {
    app.post('/getUsername', (req, res) => {
        let {token, username} = req.headers;
        db.connect(() => {
            let sql = "SELECT `ID`, `name`, `username`, `bio` FROM `accounts` WHERE `token` = ?";
            db.query(sql, token, (err, data) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                let id = data[0].ID;
                if (data.length > 0) {
                    let sql = "SELECT IFNULL((SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'), 'default') AS `profileFileName`";
                    db.query(sql, id, (err, fileNameData) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        let profileFileName = fileNameData[0].profileFileName;

                        if (username !== 'undefined') {
                            let sql = "SELECT `ID`, `name`, `username`, IFNULL(( SELECT `bio` FROM `accounts` WHERE `username` = ?), '') AS bio FROM `accounts` WHERE `username` = ?";
                            db.query(sql, [username, username], (err, follower) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                }
                                let followerid = follower[0].ID;

                                let sql = "SELECT COUNT(*) AS `count` FROM `followers` WHERE `accountID` = ? AND `followAccount` = ?";
                                db.query(sql, [id, followerid], (err, followsUserData) => {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(500);
                                        return;
                                    }

                                    if (follower.length > 0) {
                                        let output = {
                                            status: "OK",
                                            username: data[0].username,
                                            id: id,
                                            name: data[0].name,
                                            bio: data[0].bio,
                                            profileFileName: profileFileName,
                                            followerusername: follower[0].username,
                                            followerid: followerid,
                                            followername: follower[0].name,
                                            followerbio: follower[0].bio,
                                            followsUser: followsUserData[0].count,
                                        };
                                        res.send(output)
                                    }
                                })
                            })
                        } else {
                            let output = {
                                status: "OK",
                                username: data[0].username,
                                id: data[0].ID,
                                name: data[0].name,
                                bio: data[0].bio,
                                profileFileName: profileFileName,
                                followerusername: '',
                                followerid: '',
                                followername: '',
                                followerbio: 'none',
                            };
                            res.send(output)
                        }
                    })
                }
            })
        })
    });
};

