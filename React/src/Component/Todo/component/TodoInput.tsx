import React, { useContext, useEffect, useState } from 'react';
import { MyGlobalContext } from '../../../store/Context/MyGlobalContext';
import { status, ITask } from '../../../interface';
import moment from 'moment';
import { countMinutes } from '../../../utils/countMinutes';
function TodoInput (): JSX.Element {
  const {
    inputRef,
    inputData,
    setInputData,
    inputTime,
    setInputTime,
    state,
    editTask,
    addTask,
    isEdit,
    setIsEdit
  } = useContext(MyGlobalContext);
  const { job, jobs } = state;
  const today = moment(new Date()).format('YYYY-MM-DDTHH:mm');
  useEffect(() => {
    setInputTime(today);
  }, [today]);
  const [message, setMessage] = useState('');
  const resetForm = (): void => {
    setInputData('');
    setInputTime(today);
    setIsEdit(false);
    setMessage('');
  };
  const handleSubmit = () => {
    const dataTaskName = inputData.trim();
    const time = countMinutes(today, inputTime);
    const taskStatus = time <= 0 ? status.TIMEOUT : (time <= 60 ? status.DEADLINE : status.ACTIVE);
    if (isEdit) {
      const newJob: ITask = {
        ...job,
        name: dataTaskName,
        timeDeadline: inputTime
      };
      editTask(newJob);
    } else {
      const id = jobs.length > 0 ? +jobs[jobs.length - 1].id + 1 : 1;
      const newJob: ITask = {
        name: dataTaskName,
        id: id.toString(),
        timeDeadline: inputTime,
        taskStatus
      };
      addTask(newJob);
    }
    resetForm();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <>
      <div className="todo__input" >
        <input type="text" value={inputData} ref={inputRef}
          placeholder='Enter a task' className="task-input"
          id='task-input'
          required pattern="\S(.*\S)?"
          onKeyPress={(e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === 'Enter' && inputData) {
              handleSubmit();
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputData(e.target.value);
          }
          }
        />
        <input type="datetime-local" className="task-deadline" value={inputTime}
            min={today} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputTime(e.target.value);
              const minutes = countMinutes(today, e.target.value);
              minutes <= 0 && !isEdit ? setMessage('Time is not suitable') : setMessage('');
            }}
        />
        <button className="input-btn" onClick={handleSubmit} disabled={!inputData}>
          {isEdit ? 'Update' : 'Add' }
        </button>
      </div>
      {!!message && <div className="validate">{message}</div> }
    </>
  );
}

export default TodoInput;
