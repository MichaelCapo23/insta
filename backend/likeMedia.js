module.exports = (app, db) => {
    app.post('/likeMedia', (req, res) => {
        let {id} = req.headers;
        let {mediaID} = req.body;

        let output = {
            status: 'NO',
        };

        console.log(id);
        console.log(mediaID);

        let sql = "INSERT INTO `likes` (`accountID`, `mediaID`) VALUES (?,?)";
        db.connect(() => {
            db.query(sql, [id, mediaID], (err, data) => {
                if(!err) {
                    let insertID = data.insertId;
                    output = {
                        status: 'OK',
                        likedID: insertID
                    };
                    res.send(output);
                } else {
                    output.error = 'error (1) --like media service';
                    res.send(output);
                }
            })
        })
    })
};