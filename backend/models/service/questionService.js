import questionRepository from "../repository/questionRepository.js";
import GetAllQuestionsResponse from "../responses/Question/GetAllQuestionsResponse.js";
import InsertQuestionResponse from "../responses/Question/InsertQuestionResponse.js";


async function getAllQuestions() {
    let response ;
    let data = [];
    try {
        data = await questionRepository.getAllQuestions();
        response = new GetAllQuestionsResponse(200, true, "Berhasil ambil data", data);
    } catch (error) {
        console.log(error.message);
        response = new GetAllQuestionsResponse(400, true, "Gagal ambil data", data=null, error.message);
    }
    return response;
}

async function insertQuestion(name, title, body) {
    let response;
    try {
        await questionRepository.insertQuestion(name, title, body);
        response = new InsertQuestionResponse(200, true, "Berhasil Insert data");
    } catch (err) {
        response = new InsertQuestionResponse(201, false, "Gagal Insert data", [err.message]);
        console.log(err.message)
    }
    return response;
}

export default {
    getAllQuestions,
    insertQuestion
}