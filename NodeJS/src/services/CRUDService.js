import db from '../models/index'
import bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPasswordFromBcryptjs =  await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPasswordFromBcryptjs,
                address: data.address,
                gender: data.gender === '1',
                roleid: data.roleid,
                phoneNumber: data.phoneNumber,
                }
            );
            resolve('Create A New User Succeed!');
        } catch (e) {
            reject(e);
        }
    });
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try{
            let allUsers =  db.User.findAll({
                raw: true
            });
            resolve(allUsers);
        } catch (e) {
            reject(e);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            const hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }

    })
}

let getInfoUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
               where: { id: userId }
            });

            if(user){
                resolve(user);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
       try{
           let user = await db.User.findOne({
               where: {id: data.id}
           })

           if(user){
               user.firstName = data.firstName;
               user.lastName = data.lastName;
               user.address= data.address;

               await user.save();
               let allUsers = await db.User.findAll();
               resolve(allUsers);
           }
       } catch (e) {
           reject(e);
       }
    });
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })

            if(user){
                await user.destroy();
            }

            resolve(); //return
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getInfoUserById: getInfoUserById,
    updateUser: updateUser,
    deleteUser: deleteUser
}