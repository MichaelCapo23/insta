const reverse = require('reverse-md5');
module.exports = (app, db) => {
    app.post('/getSettingsInfo', async (req, res) => {
        let output = {status: 'NO'};
        let {id} = req.headers;
        let sql = "SELECT  `phone_number`, `password`, `website` FROM `accounts` WHERE `id` = ?";
        db.connect(() => {
            db.query(sql, id, (err, data) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                // data[0].password = reverse(data[0].password);

                let sql2 = "SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile' ORDER BY `created_at` DESC LIMIT 1";
                db.query(sql2, id, (err, profileData) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }

                    if (data.length > 0) {
                        output = {
                            status: "OK",
                            phone_number: data[0].phone_number,
                            password: data[0].password,
                            website: data[0].website,
                            fileName: profileData[0].fileName,
                        };
                        res.send(output)
                    }
                });
            })
        })
    });
};