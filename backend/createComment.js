module.exports = (app, db) => {
    app.post('/createComment', (req, res) => {
        let output = {
            status: 'NO'
        };
        let {id} = req.headers;
        let {mediaID, comment} = req.body;
        db.connect(() => {
            let sql = "INSERT INTO `comments` (`accountID`, `mediaID`, `comment`) VALUES (?,?,?)";
            db.query(sql, [id, mediaID, comment], (err, data) => {
                if(!err) {
                    let insertID = data.insertId;
                    output.status = 'OK';
                    output.insertID = insertID;
                    res.send(output);
                } else {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
            })
        })
    })
};