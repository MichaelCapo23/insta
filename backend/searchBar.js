module.exports = (app, db) => {
    app.post('/searchBar', (req, res) => {
        let {id, searchval} = req.headers;
        let searchQueryVal = '%'+searchval+'%';
        db.connect(() => {
            let sql = "SELECT `ID`, `username`, `name` FROM `accounts` WHERE (`username` LIKE ? OR `name` LIKE ?) AND `ID` != ?";
            db.query(sql, [searchQueryVal, searchQueryVal, id], (err, searchAccountsData) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                if(searchAccountsData.length > 0) {
                    for(let i in searchAccountsData) {
                        let currentID = searchAccountsData[i].ID;
                        let sql2 = "SELECT IFNULL((SELECT `fileName` FROM `media` WHERE `accountID` = ? AND `mediaType` = 'profile'), 'default') AS `fileName`";
                        db.query(sql2, [currentID], (err, profileData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            searchAccountsData[i].fileName = profileData[0].fileName;
                            if(i == (searchAccountsData.length - 1)) {
                                res.send(searchAccountsData);
                            }
                        })
                    }
                } else {
                    res.send('');
                }
            })
        })
    })
};