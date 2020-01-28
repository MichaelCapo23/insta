module.exports = (app, db) => {
    app.post('/getUserStats', (req, res) => {
        let output = {};
        let {id} = req.headers;
        db.connect(() => {
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
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                    })

                } else {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
            })
        })
    })
};