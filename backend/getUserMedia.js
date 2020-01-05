module.exports = (app, db) => {
    app.post('/getUserMedia', (req, res) => {
        let output = [];
        let {id} = req.headers;
        let sql = "SELECT `ID`,`fileName`, `mediaType` FROM `media` WHERE `accountID` = ?";
        db.query(sql, id, (err, mediaData) => {
            if(!err) {
                for(let i in mediaData) {
                    let rowInfo = {};
                    let mediaID = mediaData[i].ID;
                    let sql2 = "SELECT count(*) as likes, (SELECT count(*) FROM `comments` WHERE mediaID = ?) AS comments FROM `likes` WHERE mediaID = ?";
                    db.query(sql2, [mediaID, mediaID], (err, likeCommentsData) => {
                        if(!err) {
                            rowInfo = {mediaID:mediaData[i].mediaID, fileName:mediaData[i].fileName, mediaType:mediaData[i].mediaType, fileName:mediaData[i].fileName, likes:likeCommentsData[0].likes, comments:likeCommentsData[0].comments};
                            output.push(rowInfo);
                            if(i == (mediaData.length -1)) {
                                res.send(output);
                            }
                        } else {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                    })
                }
            } else {
                console.log(err);
                res.sendStatus(500);
                return;
            }
        })
    })
};