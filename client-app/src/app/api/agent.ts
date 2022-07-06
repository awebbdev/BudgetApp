import axios, { AxiosResponse } from 'axios';
import { Budget } from '../models/budget';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Budgets = {
    list: () => requests.get<Budget[]>('/budget'),
    details: (id: string) => requests.get<Budget>(`/budget/${id}`),
    create: (budget: Budget) => axios.post('/budget', budget),
    update: (budget: Budget) => axios.put(`/budget/${budget.id}`, budget),
    delete: (id: string) => axios.delete(`/budget/${id}`)
}

const agent = {
    Budgets
}

export default agent;