const fs = require('fs');
module.exports = (app, db) => {
    app.post('/addMedia', (req, res) => {
        let {desc, id} = req.headers;
        let {file} = req.body;
        db.connect(() => {
            let sql = "SELECT COUNT(*) AS `count` FROM `media` WHERE `accountID` = ?";
            db.query(sql, [id], (err, countData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                let fileName = `media_${id}_${countData[0].count}.png`;

                let writeStream = fs.createWriteStream('./src/assets/media/'+fileName);

                let contents = file.split(',')[1];

                writeStream.write(contents, 'base64');

                writeStream.on('contents', () => {
                    console.log('wrote all data to file');
                });

                writeStream.end();


                let sql2 = "INSERT INTO `media` (`accountID`, `fileName`, `mediaType`) VALUES (?,?,'post')";
                db.query(sql2, [id, fileName], (err, mediaData) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }
                    let mediaID = mediaData.insertId;

                    if(desc && desc != '') {
                        let sql3 = "INSERT INTO `comments` (`accountID`, `mediaID`, `comment`) VALUES (?,?,?)";
                        db.query(sql3, [id, mediaID, desc], (err, commentsData) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            let output = {
                                'mediaID': mediaID,
                                'commentsID': JSON.stringify(commentsData.insertId),
                            };
                            res.send(output);
                        })
                    } else {
                        let output = {
                            'mediaID': mediaID,
                        };
                        res.send(output);
                    }
                })
            });
        })
    })
};