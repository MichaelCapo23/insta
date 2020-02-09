const fs = require('fs');
module.exports = (app, db) => {
    app.post('/changeProfilePic', (req, res) => {
        let {id} = req.headers;
        let {file} = req.body;
        db.connect(() => {
            let sql = "SELECT COUNT(*) AS `count` FROM `media` WHERE `accountID` = ?";
            db.query(sql, [id], (err, countData) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                let fileName = `media_${id}_${countData[0].count}.png`;

                let writeStream = fs.createWriteStream('./src/assets/profilePics/' + fileName);

                let contents = file.split(',')[1];

                writeStream.write(contents, 'base64');

                writeStream.on('contents', () => {
                    console.log('wrote all data to file');
                });
                writeStream.end();

                let sql2 = "SELECT `ID` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'";
                db.query(sql2, [id], (err, profilePicData) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }

                    if(profilePicData.length > 0) {
                        let mediaID = profilePicData[0].ID;
                        let sql3 = "UPDATE `media` SET `fileName` = ? WHERE `ID` = ?";
                        db.query(sql3, [fileName, mediaID], (err, updateData) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            res.send(JSON.stringify(mediaID));

                        })
                    } else {
                        let sql3 = "INSERT INTO `media` (`accountID`, `fileName`, `mediaType`) VALUES (?, ?, 'profile')";
                        db.query(sql3, [id, fileName], (err, insertData) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            res.send(JSON.stringify(insertData.insertId))
                        })
                    }
                })
            })
        })
    })
};



