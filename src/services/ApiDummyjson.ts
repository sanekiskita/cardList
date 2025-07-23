import Api from "./Api";
import config from "../configs/config";
import type { responseTodos } from '../interface/ITodos';
import type { responseQuotes } from '../interface/IQuotes';

class ApiDummyjson extends Api<responseQuotes | responseTodos> {
    constructor() {
        super(config.CARD_DOMAIN)
    }

    static getUrlForGet(type: string | 'todos' | 'quotes', page: number): string {
        const skip = (page - 1) * config.CARD_LIMIT;

        return `${type}?limit=${config.CARD_LIMIT}&skip=${skip}`
    }
};

export default ApiDummyjson;