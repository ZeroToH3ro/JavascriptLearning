const { sq } = require('../config/db');

let getCRUD = (req, res) => {
    let greeting = 'Hello World';
    return res.render('crud.ejs', {greeting});
}

module.exports = {
    getCRUD,
}
