import axios from "axios";

class Api<T> {
    private axiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL
        });

        // Добавляем искусственную задержку ответа
        this.axiosInstance.interceptors.response.use(
            async (response) => {
                await new Promise(resolve => setTimeout(resolve, 1 * 1000));
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public async get(url: string): Promise<T> {
        try {
            const { data } = await this.axiosInstance.get(url);

            if (!data || typeof data !== 'object') {
                throw new Error('INVALID_RESPONSE');
            }

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    throw new Error('INVALID_STATUS');
                } else if (error.request) {
                    throw new Error('TIMEOUT_ERROR');
                }
            }

            if(error instanceof Error) {
                throw error;
            }
            
            throw new Error('INVALID_AXIOS_SETTINGS');
        }
    }
}

export default Api;