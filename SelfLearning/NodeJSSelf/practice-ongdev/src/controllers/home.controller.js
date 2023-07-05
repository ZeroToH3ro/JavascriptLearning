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
        if(result.rows[0]){
            return res.status(200).json({
                status: "get detail page success",
                data: result.rows[0]
            });
        } else {
            return res.status(400).json({
                status: "fail"
            })
        }
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

let editUser = async (req, res) => {
    try{
        const result = await connectDB.query('UPDATE users SET firstname = $1, lastname = $2, email = $3, address = $4 WHERE id = $5 RETURNING *',
            [req.body.firstname, req.body.lastname, req.body.email, req.body.address, req.params.id]);

        if(result.rows[0]){
            return res.status(200).json({
                status: "update user success",
                data: result.rows[0],
            })
        } else {
            return res.status(400).json({
                status: "fail"
            })
        }
    } catch (e) {
        console.log(e);
    }
}

let deleteUser = async (req, res) => {
    try{
        const result = await connectDB.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);

        if(result.rows[0]){
            res.status(200).json({
                status: "delete user success",
                data: result.rows[0]
            })
            return res.redirect('/');
        } else {
            return res.status(400).json({
                status: "fail"
            })
        }
    } catch (e) {
        console.log(e);
    }
}

let uploadFilePage = async  (req, res) => {
    return res.render('uploadFile.ejs');
}

let handleUploadFile = async (req, res) => {

    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
};

module.exports = {
    getHomePages,
    detailPage,
    createNewUser,
    editUser,
    deleteUser,
    uploadFilePage,
    handleUploadFile,
}
