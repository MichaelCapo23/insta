module.exports = (app, db) => {
    app.post('/profileMedia', (req, res) => {
        let {token} = req.body;
        let sql = "SELECT `id` from `accounts` WHERE `token` = ?";
        db.connect(() => {
            db.query(sql, token, (err, data) => {
                if(!err) {
                    let sql2 = "SELECT ``"
                }
            })
        })
    })
};