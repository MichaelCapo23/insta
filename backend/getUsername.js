module.exports = (app, db) => {
    app.post('/getUsername', (req, res) => {
        let {token} = req.headers;
        let sql = "SELECT `ID`, `name`, `username`, `bio` FROM `accounts` WHERE `token` = ?";
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
                            id: data[0].ID,
                            name: data[0].name,
                            bio: data[0].bio,
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