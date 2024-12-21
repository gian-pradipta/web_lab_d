import InsertQuestionResponse from "../models/responses/Question/InsertQuestionResponse.js";

function getValidationErrorResponse(errors) {
    const response = new InsertQuestionResponse(201, false, "Gagal Insert data", errors);
    return response;
}

const questionControllerHelper = {
    getValidationErrorResponse,
}

export default questionControllerHelper;