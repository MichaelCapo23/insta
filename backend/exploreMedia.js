module.exports = (app, db) => {
    app.post('/exploreMedia', (req, res) => {
        let {id} = req.headers;
        db.connect(() => {
            let sql = "SELECT `ID` FROM `media` WHERE `accountID` != ? AND mediaType = 'post'";
            db.query(sql, id, (err, nonUserPostData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                res.send(nonUserPostData)
            })
        })
    })
};