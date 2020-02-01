module.exports = (app, db) => {
    app.post('/searchBar', (req, res) => {
        let {id, searchval} = req.headers;
        console.log(req.headers);
        console.log('searchval: '+searchval);
        let searchQueryVal = '%'+searchval+'%';
        console.log('searchQueryVal: '+searchQueryVal);
        db.connect(() => {
            let sql = "SELECT `ID`, `username`, `name` FROM `accounts` WHERE (`username` LIKE ? OR `name` LIKE ?) AND `ID` != ?";
            db.query(sql, [searchQueryVal, searchQueryVal, id], (err, searchAccountsData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(searchAccountsData.length > 0) {
                    res.send(searchAccountsData);
                } else {
                    res.send('none');
                }
            })
        })
    })
};