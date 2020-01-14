module.exports = (app, db) => {
    app.post('/getFollowerUsername', (req, res) => {
        let {username} = req.headers;
        let sql = "SELECT `ID`, `name`, `username` FROM `accounts` WHERE `username` = ?";
        db.connect(() => {
            db.query(sql, username, (err, data) => {
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