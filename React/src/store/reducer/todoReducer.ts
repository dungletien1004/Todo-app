import { ITask, ITaskStatus, actionJob, Action } from '../../interface';
export function reducer (state: ITaskStatus, action: Action): ITaskStatus {
  switch (action.type) {
    case actionJob.SET_JOBS:
      if (action.payload !== null) {
        return {
          ...state,
          jobs: action.payload
        };
      }
      return state;
    case actionJob.SET_JOB:
      return {
        ...state,
        job: {
          id: action.payload.id.toString(),
          name: action.payload.name.toString(),
          taskStatus: action.payload.taskStatus,
          timeDeadline: ''
        }
      };
    case actionJob.ADD_JOB: {
      const newJob: ITask = {
        id: action.payload.id.toString(),
        name: action.payload.name.toString(),
        taskStatus: action.payload.taskStatus,
        timeDeadline: action.payload.timeDeadline
      };
      return {
        ...state,
        jobs: [...state.jobs, newJob]
      };
    }
    case actionJob.DELETE_JOB: {
      const newJobs = state.jobs.filter((job) => job.id !== action.payload.toString());
      return {
        ...state,
        jobs: newJobs
      };
    }
    case actionJob.EDIT_JOB: {
      const newJobs = state.jobs.map((job) => {
        return +job.id === +action.payload.id ? { ...action.payload } : job;
      });
      return {
        ...state,
        jobs: newJobs
      };
    }
  }
}
