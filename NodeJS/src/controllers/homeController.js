import db from "../models/index";
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) => {
    try{
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {data: JSON.stringify(data)});
    } catch (e) {
        console.log(e);
     }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    return res.send('post crud from server');
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;

    if(userId){
        let userData = await CRUDService.getInfoUserById(userId);
        return res.render('editCRUD.ejs', {
            user: userData
        });
    } else {
        return res.send('ID do not exists' );
    }
}

let putCRUD = async (req, res) => {
    let data = await CRUDService.updateUser(req.body);
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}

let deleteCRUD = async (req,res) => {
    let id = req.query.id;
    if (id){
        await CRUDService.deleteUser(id);
        return res.send("Delete succeed!");
    }
    return res.send("Delete failed");
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}