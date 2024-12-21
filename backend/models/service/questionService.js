import questionRepository from "../repository/questionRepository.js";
import GetAllQuestionsResponse from "../responses/Question/GetAllQuestionsResponse.js";
import InsertQuestionResponse from "../responses/Question/InsertQuestionResponse.js";
import QuestionResponse from "../responses/Question/QuestionResponse.js";

async function getAllQuestions() {
    let response ;
    let data = [];
    try {
        data = await questionRepository.getAllQuestions();
        response = new QuestionResponse(200, true, "Berhasil ambil data", data);
    } catch (error) {
        console.log(error.message);
        response = new QuestionResponse(400, true, "Gagal ambil data", data=null, error.message);
    }
    return response;
}

async function insertQuestion(name, title, body) {
    let response;
    try {
        if (!name) name = "Anonymous";
        await questionRepository.insertQuestion(name, title, body);
        response = new QuestionResponse(200, true, "Berhasil Insert data");
    } catch (err) {
        response = new QuestionResponse(201, false, "Gagal Insert data", [err.message]);
    }
    return response;
}

async function deleteQuestion(id) {
    let response;
    try {
        await questionRepository.deleteQuestion(id);
        response = new QuestionResponse(200, true, "Berhasil Hapus data");
    } catch (err) {
        response = new QuestionResponse(404, false, "Gagal Delete data", [err.message]);
    }
    return response;
}

export default {
    getAllQuestions,
    insertQuestion,
    deleteQuestion
}