module.exports = (app, db) => {
    app.post('/addMedia', (req, res) => {
        let {file, desc} = req.headers;
        db.connect(() => {
            let sql = "";
        })
    })
};