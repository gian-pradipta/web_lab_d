import db from "../../db.js"

async function getAllQuestions() {
    const data = await db.all("SELECT * FROM questions order by id desc");
    return data;
}

async function insertQuestion(name, title, body) {
    const response = await db.run(`INSERT INTO questions (title, name, body) VALUES(?, ?, ?)`, [title, name, body]);
    return response;
}

async function deleteQuestion(id) {
    const response = await db.run(`DELETE FROM questions WHERE id = ?`, [id]);
    if (response.changes == 0) throw new Error("Gagal Delete data, data tidak ditemukan");
    return response;
}

const questionRepository = {
    getAllQuestions,
    insertQuestion,
    deleteQuestion,
}

export default questionRepository;