import { ITask, actionJob, Add, Delete, Edit, SetAll, Set } from '../../interface';

function addJob (payload: ITask): Add {
  return {
    type: actionJob.ADD_JOB,
    payload
  };
}
function deleteJob (payload: number): Delete {
  return {
    type: actionJob.DELETE_JOB,
    payload
  };
}
function editJob (payload: ITask): Edit {
  return {
    type: actionJob.EDIT_JOB,
    payload
  };
}
function setJobs (payload: ITask[]): SetAll {
  return {
    type: actionJob.SET_JOBS,
    payload
  };
}
function setJob (payload: ITask): Set {
  return {
    type: actionJob.SET_JOB,
    payload
  };
}

export { addJob, deleteJob, editJob, setJobs, setJob };
