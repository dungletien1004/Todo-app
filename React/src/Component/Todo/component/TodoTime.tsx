import moment from 'moment';
import React, { useEffect, useContext } from 'react';
import { propsTime, status } from '../../../interface';
import { MyGlobalContext } from '../../../store/Context/MyGlobalContext';

function TodoTime (props: propsTime) {
  const { job, currentTime } = props;
  const { editTask } = useContext(MyGlobalContext);
  const timeDeadline = moment(job.timeDeadline).diff(moment(currentTime), 'seconds');
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    return `About ${minutes + 1} minutes left`;
  };
  useEffect(() => {
    if (timeDeadline <= 1) {
      editTask({ ...job, taskStatus: status.TIMEOUT });
    }
  }, [timeDeadline]);
  return (
    <div className="task__status">{formatTime(timeDeadline)}</div>
  );
}

export default TodoTime;
