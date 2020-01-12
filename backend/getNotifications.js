module.exports = (app, db) => {
    app.post('/getNotifications', (req, res) => {
        let {id} = req.headers;
        db.connect(() => {
            let sql = "";
            db.query(sql, [], (err, data) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                res.send(res);
            })
        })
    })
};