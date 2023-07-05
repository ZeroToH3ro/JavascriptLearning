const connectDB  = require("../configs/connectDB.js")

let getHomePages = async (req, res) => {
    try {
        const results = await connectDB.query('SELECT * FROM users');
        console.log("Query from database:", results.rows);
        return res.render('index.ejs', { dataUser: results.rows, test: 'load data success' });
    } catch (error) {
        console.error('Error executing query:', error);
    }
};

let detailPage = async (req, res) => {
    try{
        const requestID = req.params.id;
        const result = await connectDB.query('SELECT * FROM users WHERE id = $1', [requestID]);
        return res.status(200).json({
            status: "get detail page success",
            data: result.rows[0]
        });
    } catch (e) {
        console.log(e);
    }
}

let createNewUser = async (req, res) => {
    try{
        const result = await connectDB.query('INSERT INTO users (firstname, lastname, email, address) VALUES(' +
            '$1, $2, $3, $4) RETURNING *', [req.body.firstname, req.body.lastname, req.body.email, req.body.address]);
        return res.status(200).json({
            status: "create new user success",
            data: result.rows[0]
        })
    } catch (e) {
        console.log(e);
    }
}
module.exports = {
    getHomePages,
    detailPage,
    createNewUser
}
