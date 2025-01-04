export type RepositoryResult<T> = {
    operation : "insert" | "delete",
    rowsAffected : number,
    lastId : number,
    lastRecord : T[],
}