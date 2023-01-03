import React, { useContext } from 'react';
import '../../assets/css/sideBar.css';
import avt from '../../assets/img/defaultAvt.png';
import { MyGlobalContext } from '../../store/Context/MyGlobalContext';
import { status, ITask } from '../../interface';
import moment from 'moment';

function SideBar (): JSX.Element {
  const { state } = useContext(MyGlobalContext);
  const toDay = moment(new Date()).format('DD/MM/YYYY');
  const getCountTask = (jobStatus: status) => {
    if (jobStatus === status.ALL) {
      return state.jobs.length;
    }
    const active = state.jobs.filter((job: ITask) => (job.taskStatus === status.ACTIVE || job.taskStatus === status.DEADLINE));
    return jobStatus === status.COMPLETED ? state.jobs.filter((job: ITask) => job.taskStatus === status.COMPLETED).length : active.length;
  };
  const jobStatus = [status.ALL, status.ACTIVE, status.COMPLETED];
  return (
    <aside className="sideBar">
      <div className="sideBar__user">
        <img src={avt}
          alt="Avatar" className="sideBar__user__avt" />
        <div className="sideBar__user__name">Lê Tiến Dũng</div>
        <div className="sideBar__user__card">
          {jobStatus.map((jobStatus: status, index: number) => (
            <div className="card" key={index}>
              <div className="card__number">{getCountTask(jobStatus)}</div>
              <div className="card__title">
                {jobStatus}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sideBar__today">{toDay}</div>
    </aside>
  );
}
export default SideBar;
