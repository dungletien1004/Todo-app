import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MyGlobalContext } from '../../../store/Context/MyGlobalContext';
import { status, ITask } from '../../../interface';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { countMinutes } from '../../../utils/countMinutes';
import TodoTime from './TodoTime';
function TodoList (): JSX.Element {
  const {
    inputRef,
    state,
    searchJob,
    currentStatus,
    setTask,
    deleteTask,
    setIsEdit,
    setInputData,
    setInputTime,
    editTask
  } = useContext(MyGlobalContext);
  const { jobs } = state;
  const today = moment().format('YYYY-MM-DDTHH:mm');
  const [currentTime, setCurrentTime] = useState(() => moment().format('YYYY-MM-DDTHH:mm:ss'));
  useEffect(() => {
    const interval = setInterval(() => {
      const getCurrentTime = moment().format('YYYY-MM-DDTHH:mm:ss');
      setCurrentTime(getCurrentTime);
      const deadline = state.jobs.some((job: ITask) => job.taskStatus === status.DEADLINE);
      if (!deadline) {
        clearInterval(interval);
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [jobs]);
  const handleJobEdit = (job: ITask): void => {
    setInputTime(job.timeDeadline);
    setIsEdit(true);
    setTask(job);
    setInputData(job.name);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    jobs.forEach((job: ITask) => {
      const time = countMinutes(today, job.timeDeadline);
      if (time <= 60 && job.taskStatus === status.ACTIVE) {
        editTask({ ...job, taskStatus: status.DEADLINE });
      } else if (time <= 0 && job.taskStatus === status.ACTIVE) {
        editTask({ ...job, taskStatus: status.TIMEOUT });
      }
    });
  }, [today]);
  const jobsRender = useMemo(() => {
    const newJobs: ITask[] = (currentStatus === status.ALL ? jobs : jobs.filter((job: ITask) => currentStatus !== status.ACTIVE ? job.taskStatus === currentStatus : (job.taskStatus === currentStatus || job.taskStatus === status.DEADLINE)));
    const jobsSearch: ITask[] = newJobs.filter((job: ITask) => job.name ? job.name.toLowerCase().includes(searchJob.toLowerCase()) : '');
    return jobsSearch.reverse();
  }, [jobs, currentStatus, searchJob, today]);
  return (
    <ul className="task__display-list">
      {jobsRender.map((job: ITask) => (
        <li key={job.id} className={`task__content ${job.taskStatus}`}>
          <div className="task__name"> {job.name}</div>
          {job.taskStatus === status.DEADLINE ? <TodoTime job={job} currentTime={currentTime} /> : <div className="task__status">{job.taskStatus === status.ACTIVE ? '' : job.taskStatus}</div> }
          <div className="task__icon">
            <FontAwesomeIcon icon={faTrash} title='Delete task' className="task__delete" onClick={() => {
              deleteTask(parseInt(job.id));
            }} />
            <FontAwesomeIcon icon={faPen} title='Edit task' className="task__edit" onClick={() => handleJobEdit(job)} />
            {(job.taskStatus !== status.COMPLETED && job.taskStatus !== status.TIMEOUT) ? <FontAwesomeIcon icon={faCheck} title='Change status' className="task__check" onClick={() => { editTask({ ...job, taskStatus: status.COMPLETED }); }}/> : ''}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
