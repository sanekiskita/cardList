import type { response } from '../interface/IResponse';

export interface Todo {
    id: number,
    completed: boolean,
    todo: string,
    userId: number,
}

export interface responseTodos extends response {
    todos: Todo[],
}