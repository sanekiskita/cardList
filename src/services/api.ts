import axios from "axios";
import config from "../configs/config";
import type { responseTodos } from '../interface/ITodos';
import type { responseQuotes } from '../interface/IQuotes';

const instance = axios.create({
    baseURL: `${config.CARD_DOMAIN}`
});

// Добавляем искусственную задержку ответа
instance.interceptors.response.use(
    async (response) => {
      await new Promise(resolve => setTimeout(resolve, 1 * 1000));
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const api = {
    axios: instance,
    get: async function (type: string|'todos'|'quotes', page: number): Promise<responseQuotes|responseTodos> {
        return new Promise<responseQuotes|responseTodos>((resolve, reject) => {
            const skip = (page - 1) * config.CARD_LIMIT;

            this.axios.get(
                `${type}?limit=${config.CARD_LIMIT}&skip=${skip}`
            ).then(({data}) => {
                if (!data || typeof data !== 'object') {
                    reject('INVALID_RESPONSE');
                    return;
                }


                resolve(data);
            }).catch((error) => {

                if (error.response) {
                    reject('INVALID_STATUS');
                    return;
                }

                if (error.request) {
                    reject('TIMEOUT_ERROR');
                    return;
                }
                
                reject('INVALID_AXIOS_SETTINGS');
                return;
                    
            });
        });
    }
}

export default api;