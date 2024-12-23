import { QuestionBody } from "./QuestionTypes"

export type ErrorResponse = {
    status : number,
    success : false,
    message : string,
    errors : string[]
} 

export type GetResponse = {
    status : number,
    success : true,
    message : string,
    data : QuestionBody[],
}

export type InsertResponse = {
    status : number,
    success : true,
    message : string,
    inserted_data : QuestionBody,
}

export type DeleteResponse = {
    status : number,
    success : true,
    message : string,
    last_id : number
}

