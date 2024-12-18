import userService from "../models/service/userService.js";

async function getAllUsers(req, res) {
    const response = await userService.getAllUsers();
    return res.status(response.statusCode).json(response.getJSON());
}

async function insertUser(req, res) {
    const body = req.body;
    const response = await userService.insertuser(body.name, body.email);
    return res.status(response.statusCode).json(response.getJSON());
}
const userController = {
    getAllUsers,
    insertUser,
};

export default userController;