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
                if (data.length > 0) {
                    if(username !== 'undefined') {
                        let sql = "SELECT `ID`, `name`, `username`, IFNULL(( SELECT `bio` FROM `accounts` WHERE `username` = ?), '') AS bio FROM `accounts` WHERE `username` = ?";
                        db.query(sql, [username, username], (err, follower) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            if (follower.length > 0) {
                                let output = {
                                    status: "OK",
                                    username: data[0].username,
                                    id: data[0].ID,
                                    name: data[0].name,
                                    bio: data[0].bio,
                                    followerusername: follower[0].username,
                                    followerid: follower[0].ID,
                                    followername: follower[0].name,
                                    followerbio: follower[0].bio,
                                };
                                res.send(output)
                            }
                        })
                    } else {
                        let output = {
                            status: "OK",
                            username: data[0].username,
                            id: data[0].ID,
                            name: data[0].name,
                            bio: data[0].bio,
                            followerusername: '',
                            followerid: '',
                            followername: '',
                            followerbio: 'none',
                        };
                        res.send(output)
                    }
                }
            })
        })
    });
};