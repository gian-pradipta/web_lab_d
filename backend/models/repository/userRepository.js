import db from "../../db.js"

async function getAllUsers() {
    const data = await db.all("SELECT * FROM users");
    return data;
}

async function insertUser(name, email) {
    const response = await db.run(`INSERT INTO users (name, email) VALUES(?, ?)`, [name, email]);
    return response;
}

const userRepository = {
    getAllUsers,
    insertUser
}
export default userRepository;