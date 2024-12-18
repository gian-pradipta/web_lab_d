import userRepository from "../repository/userRepository.js";
import GetAllUsersResponse from "../responses/Users/GetAllUsers/GetAllUsers.js";
import InsertUserResponse from "../responses/Users/InsertUser/InsertUser.js";

async function getAllUsers() {
    let response ;
    let data = [];
    try {
        data = await userRepository.getAllUsers();
        response = new GetAllUsersResponse(200, true, "Berhasil ambil data", data);
    } catch (error) {
        console.log(error.message);
        response = new GetAllUsersResponse(400, true, "Gagal ambil data", data=null, error.message);
    }
    return response;
}

async function insertuser(name, email) {
    let response;
    try {
        await userRepository.insertUser(name, email);
        response = new InsertUserResponse(200, true, "Berhasil Insert data");
    } catch (err) {
        response = new InsertUserResponse(201, false, "Gagal Insert data", [err.message]);
        console.log(err.message)
    }
    return response;
}

export default {
    getAllUsers,
    insertuser
}