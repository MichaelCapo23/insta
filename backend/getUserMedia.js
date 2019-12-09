module.exports = (app, db) => {
    app.post('/getUserMedia', (req, res) => {
        let {token} = req.headers;
        const sql = "SELECT `ID` FROM `accounts` WHERE token = ?";
        db.connect(() => {
            db.query(sql, token, (err, data) => {
                if (!err) {
                    let id = data[0].ID;
                    sql2 = "SELECT `fileName`,(SELECT count(*) FROM `likes` WHERE mediaID = '1') as likes, (SELECT count(*) FROM `comments` WHERE mediaID = '1') AS comments FROM `media` WHERE `accountID` = ? AND `mediaType` = 'post'";
                    db.query(sql2, id, (err, data) => {
                        if(!err) {
                            let output = {
                                status: 'OK',
                                media: data
                            };
                            res.send(output);
                        } else {
                            let message = 'Query Error (2) --getUserMedia';
                            res.send(message);
                        }
                    })
                } else {
                    let message = 'Query Error (1) --getUserMedia';
                    res.send(message);
                }
            })
        })
    })
}