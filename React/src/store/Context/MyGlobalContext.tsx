import { createContext, useState, useReducer, useRef } from 'react';
import { addJob, deleteJob, editJob, setJobs, setJob } from '../action';
import { status, ITask, ITaskStatus } from '../../interface';
import { reducer } from '../reducer/todoReducer';
import { initTodoContext } from './initContext';
import todoApi from '../../API/todoApi';
import moment from 'moment';
export interface GlobalContext {
  inputRef: React.RefObject<HTMLInputElement>
  searchJob: string
  setSearchJob: (c: string) => void
  inputData: string
  setInputData: (c: string) => void
  inputTime: string
  setInputTime: (c: string) => void
  isEdit: boolean
  setIsEdit: (c: boolean) => void
  currentStatus: status
  setCurrentStatus: (c: status) => void
  state: ITaskStatus
  setAllTask: (jobs: ITask[]) => void
  setTask: (job: ITask) => void
  addTask: (job: ITask) => void
  deleteTask: (id: number) => void
  editTask: (job: ITask) => void
}
interface ContextProviderProps {
  children: React.ReactNode
}
export const MyGlobalContext = createContext<GlobalContext>(initTodoContext);
export const GlobalContextWrapper = ({ children }: ContextProviderProps) => {
  const [searchJob, setSearchJob] = useState('');
  const [inputData, setInputData] = useState('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState(status.ALL);
  const [state, dispatch] = useReducer(reducer, {
    job: {
      id: '',
      name: '',
      taskStatus: '',
      timeDeadline: ''
    },
    jobs: []
  });
  const setAllTask = (jobs: ITask[]) => dispatch(setJobs(jobs));
  const setTask = (job: ITask) => dispatch(setJob(job));
  const addTask = async (job: ITask) => {
    dispatch(addJob(job));
    await todoApi.postTask(job);
  };
  const deleteTask = async (id: number) => {
    dispatch(deleteJob(id));
    await todoApi.delTask(id);
  };
  const editTask = async (job: ITask) => {
    dispatch(editJob(job));
    await todoApi.putTask(+job.id, job);
  };
  const [inputTime, setInputTime] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm'));
  const inputRef = useRef<HTMLInputElement>(null);
  const valueContext = {
    inputRef,
    searchJob,
    setSearchJob,
    inputData,
    setInputData,
    inputTime,
    setInputTime,
    isEdit,
    setIsEdit,
    currentStatus,
    setCurrentStatus,
    state,
    setAllTask,
    setTask,
    addTask,
    deleteTask,
    editTask
  };
  return <MyGlobalContext.Provider value = {valueContext}>
    {children}
  </MyGlobalContext.Provider>;
};
