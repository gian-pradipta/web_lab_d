export default class QuestionResponse {
    constructor(statusCode, success, message, data, errors=null) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }

    getJSON() {
        let response = {
            status: this.statusCode,
            success: this.success,
            message: this.message,
        }
        if (this.errors) response.errors = this.errors;
        else response.data = this.data;

        return response;
    }
}