module.exports = (app, db) => {
    app.post('/createComment', (req, res) => {
        let output = {
            status: 'NO'
        };

        let {token} = req.headers;
        let {mediaID, comment} = req.body;

        let sql = "SELECT `ID` from `accounts` WHERE `token` = ?";
        db.connect(() => {
            db.query(sql, token, (err, data) => {
                if(!err) {
                    let id = data[0].ID;
                    let sql2 = "INSERT INTO `comments` (`accountID`, `mediaID`, `comment`) VALUES (?,?,?)";
                    db.query(sql2, [id, mediaID, comment], (err, data) => {
                        if(!err) {
                            let insertID = data.insertId;
                            output.status = 'OK';
                            output.insertID = insertID;
                            res.send(output);
                        } else {
                            let message = 'Query Error (2) --create comment';
                            res.send(message);
                        }
                    })
                }  else {
                    let message = 'Query Error (1) --create comment';
                    res.send(message);
                }
            })
        })
    })
};