import React, { useContext } from 'react';
import { MyGlobalContext } from '../../../store/Context/MyGlobalContext';
import { status } from '../../../interface';

function TodoFilter () {
  const { currentStatus, setCurrentStatus } = useContext(MyGlobalContext);
  const statusJob = [status.ALL, status.ACTIVE, status.COMPLETED, status.DEADLINE, status.TIMEOUT];
  return (
   <ul className="list__title">
      {statusJob.map((statusJob, index: number) => (
        <li key={index} className={'status__title ' + (currentStatus === statusJob ? 'active' : '')} onClick={() => setCurrentStatus(statusJob)}>{statusJob === status.DEADLINE ? 'Deadline' : statusJob}</li>
      ))}
    </ul>
  );
}

export default TodoFilter;
