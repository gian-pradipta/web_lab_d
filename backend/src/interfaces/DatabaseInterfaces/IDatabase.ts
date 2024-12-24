export interface IDatabase {
    connect() : Promise<void>,
    query<T>(query : string, ...params : any) : Promise<T[]>,
    execute(query : string, ...params : any) : Promise<any>,
}