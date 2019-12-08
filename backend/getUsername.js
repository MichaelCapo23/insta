module.exports = (app, db) => {
    app.post('/getUsername', (req, res) => {
        let {token} = req.headers;
        let sql = "SELECT `name`, `username` FROM `accounts` WHERE `token` = ?";
        db.connect(() => {
            db.query(sql, token, (err, data) => {
                if (!err) {
                    let output = {
                        status: "NO",
                        errMessage: "Token doesn't match any users"
                    };
                    if (data.length > 0) {
                        output = {
                            status: "OK",
                            username: data[0].username,
                            name: data[0].name
                        }
                    }
                    res.send(output)
                } else {
                    console.log(err)
                }
            })
        })
    });
};