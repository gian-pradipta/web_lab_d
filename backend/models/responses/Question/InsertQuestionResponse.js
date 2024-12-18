export default class InsertQuestionResponse{
    constructor(statusCode, success, message, errors=null) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.errors = errors;
    }

    getJSON() {
        let response = {
            status: this.statusCode,
            success: this.success,
            message: this.message,
        }
        if (this.errors) response.errors = this.errors;

        return response;
    }


}