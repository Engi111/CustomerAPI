// const Users = require ("../models/user.model")

// // get all users
// exports.getAllUsers = async () => {
//     try {
//         const data = await Users.find();
//         return data;
//     } catch (error) {
//         throw new Error('Cannot get all users')
//     }
// }
// //delete user
// exports.deleteUser = async () => {
//     try {
//         const data = await Users.delete();
//         return  data;
//     } catch (error) {
        
//     }
// }
// //register / create user 
// exports.registerUser = async (payload) => {
//     const {email, password, username} = payload;
//     // to check if credentials are given
//     if (!email && !password && !username) {
//         throw Error("Credentials not provided")
//     }
//     // try {
        
//     // } catch (error) {
//     //     throw new Error ("Unable to register")
//     // }
// }