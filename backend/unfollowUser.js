module.exports = (app, db) => {
    app.post('/unfollowUser', (req, res) => {
        let {id, unfollowid} = req.headers;
        console.log(JSON.stringify(req.headers, null, 2));

        console.log('id: '+id);
        console.log('unfollowID: '+unfollowid);
        let output = {status: 'NO'};

        let sql = "DELETE FROM `followers` WHERE `accountID` = ? AND `followAccount` = ?";
        db.connect(() => {
            db.query(sql, [id, unfollowid], (err, data) => {
                if(!err) {
                    output = {
                        status: 'OK',
                        unfollowUserID: unfollowid

                    }
                    res.send(output);
                } else {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
            })
        })
    })
}