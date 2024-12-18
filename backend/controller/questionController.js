import questionService from "../models/service/questionService.js";

async function getAllQuestions(req, res) {
    const response = await questionService.getAllQuestions();
    return res.status(response.statusCode).json(response.getJSON());
}

async function insertQuestion(req, res) {
    const body = req.body;
    const response = await questionService.insertQuestion(body.name, body.title, body.body);
    return res.status(response.statusCode).json(response.getJSON());
}
const questionController = {
    getAllQuestions,
    insertQuestion,
};

export default questionController;