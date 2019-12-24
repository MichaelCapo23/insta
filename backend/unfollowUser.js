module.exports = (app, db) => {
    app.post('/unfollowUser', (req, res) => {
        let {id, posterID} = req.headers;
        let output = {status: 'NO'};

        let sql = "DELETE FROM `followers` WHERE `accountID` = ? AND `followAccount` = ?";
        db.connect(() => {
            db.query(sql, [id, posterID], (err, data) => {
                if(!err) {
                    let insert_id = data.insertId;
                    output = {
                        status: 'OK',
                        unfollowUserID: insert_id

                    }
                    res.send(output);
                } else {
                    console.log('Query Error (1) --unfollow user service');
                    res.send(output)
                }
            })
        })
    })
}