module.exports = (app, db) => {
    app.post('/saveMedia', (req, res) => {
        let {id, mediaid} = req.headers;
        db.connect(() => {
            let sql = "INSERT INTO `saved_media` (`accountiD`, `mediaID`) VALUES (?, ?)";
            db.query(sql, [id, mediaid], (err, data) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                let savedID = data.insertId;
                savedID = JSON.stringify(savedID);
                res.send(savedID);
            })
        })
    })
};