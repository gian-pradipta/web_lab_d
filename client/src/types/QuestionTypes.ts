export namespace QuestionTypes{
    export type PostBody = {
        name : string,
        title : string,
        body : string,
    }

    export type QuestionBody = {
        id : number,
        name : string,
        title : string,
        body : string,
    }
    export type APIResponse =
    | {
        status: number;
        success: true; 
        message: string[];
        data: QuestionBody[];
      }
    | {
        status: number;
        success: false; 
        errors: string[];
        data: QuestionBody[];
      };
  
}