const  {pool}  = require("../configs/connectDB.js")

let getHomePages = async (req, res) => {
    try {
        await pool.connect();
        const { rows } = await pool.query('SELECT * FROM users', (error, result) => {
            if(error){
                console.log(error);
            } else {
                console.log("Result from database: ", result);
            }
        });

        console.log("Query from database:", rows);
        return res.render('index.ejs', { dataUser: rows, test: 'load data success' });
    } catch (error) {
        console.error('Error executing query:', error);
        // Handle the error appropriately (e.g., send an error response)
    }
};
module.exports = {
    getHomePages
}
