import db from "../../db.js"

async function getAllQuestions() {
    const data = await db.all("SELECT * FROM questions");
    return data;
}

async function insertQuestion(name, title, body) {
    const response = await db.run(`INSERT INTO questions (title, name, body) VALUES(?, ?, ?)`, [title, name, body]);
    return response;
}

const questionRepository = {
    getAllQuestions,
    insertQuestion
}

export default questionRepository;