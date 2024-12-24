export interface ErrorResponse {
    status : number;
    success : false;
    message : string;
    errors : string[];
} 

export interface GetResponse<T> {
    status : number,
    success : true,
    message : string,
    data : T[],
}

export interface InsertResponse<T> {
    status : number,
    success : true,
    message : string,
    inserted_data : T,
}

export interface DeleteResponse {
    status : number,
    success : true,
    message : string,
    last_id : number
}