import { ITask } from '../interface';
import axiosClient from './axiosClient';
const todoApi = {
  getAll: async () => {
    const url = '/todos';
    return await axiosClient.get<ITask[], ITask[]>(url);
  },
  putTask: async (id: number, value: ITask) => {
    const url = `/todos/${id}`;
    return await axiosClient.put(url, value);
  },
  delTask: async (id: number) => {
    const url = `/todos/${id}`;
    return await axiosClient.delete(url);
  },
  postTask: async (param: ITask) => {
    const url = '/todos';
    return await axiosClient.post(url, param);
  }
};
export default todoApi;
