import type { response } from './IResponse';

export interface Quote {
    id: number,
    quote: string,
    author: string,
}

export interface responseQuotes extends response {
    quotes: Quote[],
}