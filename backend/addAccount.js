const md5 = require('md5');
const nodeFns = require('./nodeFns');

module.exports = (app, db) => {
    app.post('/addAccount', (req, res) => {
        let {email, password, name, username} = req.headers;
        let token = md5(username + password);
        password = md5(password);
        let valuesArr = {name, username, email, password, token};
        db.connect(() => {
            let sql = "SELECT COUNT(*) AS `usernames` FROM `accounts` WHERE `username` = ?";
            db.query(sql, [username], (err, usernamesData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(usernamesData[0].usernames > 0) {
                    let output = {
                        status: 'NO',
                        errMessage: 'Invalid Username',
                    };
                    res.send(output);
                    return;
                }

                let sql2 = "SELECT COUNT(*) AS `passwords` FROM `accounts` WHERE `password` = ?";
                db.query(sql2, [password], (err, passwordsData) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }

                    if(passwordsData[0].passwords > 0) {
                        let output = {
                            status: 'NO',
                            errMessage: 'Invalid Password',
                        };
                        res.send(output);
                        return;
                    }

                    let cols = [];
                    let vals = [];
                    for (let [key, value] of Object.entries(valuesArr)) {
                        cols.push(key);
                        vals.push(value);
                    }
                    db.connect(() => {
                        let sql = "INSERT INTO `accounts` (" + cols + ") VALUES (?)";
                        db.query(sql, [vals], (err, data) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }

                            let output = {
                                status: "OK",
                                token: token
                            };
                            res.send(output);
                        })
                    })
                })
            })
        });
    });
};