import { body } from "express-validator"

function getInsertQuestionValidationRules() {
    return [
        body("title")
            .notEmpty()
            .withMessage("Judul harus berisi!"),
        body("body")
            .exists()
            .withMessage("Deskripsi harus ada")
    ]
}

const questionRouteHelper = {
    getInsertQuestionValidationRules,
}

export default questionRouteHelper;
