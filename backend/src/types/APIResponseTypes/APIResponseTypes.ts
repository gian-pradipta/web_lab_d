export type ErrorResponse = {
    status : number;
    success : false;
    message : string;
    errors : string[];
} 

export type GetResponse<T> = {
    status : number,
    success : true,
    message : string,
    data : T[],
}

export type InsertResponse<T> = {
    status : number,
    success : true,
    message : string,
    inserted_data : T,
}

export type DeleteResponse = {
    status : number,
    success : true,
    message : string,
    last_id : number
}