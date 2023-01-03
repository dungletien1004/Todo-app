export interface ITaskStatus {
  job: ITask
  jobs: ITask[]
}
export interface ITaskAction {
  type: string
  payload: ITask | ITask[]
}
export interface ITask {
  id: string
  name: string
  taskStatus: string
  timeDeadline: string
}
export type Action =
| Set
| Add
| Edit
| Delete
| SetAll;
export interface Add {
  type: actionJob.ADD_JOB
  payload: ITask
}

export interface SetAll {
  type: actionJob.SET_JOBS
  payload: ITask[]
}
export interface Set {
  type: actionJob.SET_JOB
  payload: ITask
}
export interface Delete {
  type: actionJob.DELETE_JOB
  payload: number
}
export interface Edit {
  type: actionJob.EDIT_JOB
  payload: ITask
}

export enum status {
  ALL = 'All',
  ACTIVE = 'Pending',
  COMPLETED = 'Completed',
  DEADLINE = 'About 1h left',
  TIMEOUT = 'Time out'
}
export enum actionJob {
  SET_JOBS = 'set_jobs',
  SET_JOB = 'set_job',
  ADD_JOB = 'add_job',
  DELETE_JOB = 'delete_job',
  EDIT_JOB = 'edit_job'
}
export interface propsTime {
  job: ITask
  currentTime: string
}
