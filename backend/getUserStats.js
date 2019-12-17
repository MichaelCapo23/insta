module.exports = (app, db) => {
    app.post('/getUserStats', (req, res) => {
        let output = {};
        let {token} = req.headers;
        const sql = "SELECT `ID` FROM `accounts` WHERE token = ?";
        db.connect(() => {
            db.query(sql, token, (err, data) => {
                if(!err) {
                    let id = data[0].ID;
                    const sql2 = "SELECT COUNT(*) AS `following` FROM `followers` AS fs WHERE `accountID` = ?";
                    db.query(sql2, id, (err, data) => {
                        if(!err) {
                            output = {
                                following: data[0].following,
                            };
                            const sql3 = "SELECT COUNT(*) AS `followers` FROM `followers` WHERE `followAccount` = ?";
                            db.query(sql3, id, (err, data) => {
                                if(!err) {
                                    output.followers = data[0].followers;

                                    let sql4 = "SELECT COUNT(*) AS `posts` FROM `media` AS fs WHERE `accountID` = ? AND `mediaType` = 'post'";
                                    db.query(sql4, id, (err, data) => {
                                        if(!err) {
                                            output.posts = data[0].posts;
                                            output.status = 'OK';
                                            res.send(output);
                                        }
                                    })
                                } else {
                                    let message = 'Query Error (3) --getUserStats';
                                    res.send(message)
                                }
                            })

                        } else {
                            let message = 'Query Error (2) --getUserStats';
                            res.send(message)
                        }
                    })
                } else {
                    let message = 'Querry Error (1) --getUserStats';
                    res.send(message)
                }
            })
        })
    })
};