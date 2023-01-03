import { status } from '../../interface';
export const initTodoContext = {
  inputRef: { current: null },
  searchJob: '',
  setSearchJob: () => {},
  inputData: '',
  setInputData: () => {},
  inputTime: '',
  setInputTime: () => {},
  isEdit: false,
  setIsEdit: () => {},
  currentStatus: status.ALL,
  setCurrentStatus: () => {},
  state: {
    job: {
      id: 'a',
      name: '',
      taskStatus: '',
      timeDeadline: ''
    },
    jobs: []
  },
  setAllTask: () => {},
  setTask: () => {},
  addTask: () => {},
  deleteTask: () => {},
  editTask: () => {}
};
