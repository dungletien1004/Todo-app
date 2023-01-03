import React, { useEffect, useContext } from 'react';
import '../assets/css/todo.css';
import { MyGlobalContext } from '../store/Context/MyGlobalContext';
import todoApi from '../API/todoApi';
import { TodoFilter, TodoInput, TodoList } from '../Component/Todo/';
function Todo (): JSX.Element {
  const { setAllTask } = useContext(MyGlobalContext);
  const fetchTaskList = async () => {
    try {
      const response = await todoApi.getAll();
      setAllTask(response);
    } catch (err) {
    }
  };
  useEffect(() => {
    fetchTaskList();
  }, []);
  return (
    <div className='todo'>
      <TodoInput />
      <div className="task__list">
        <TodoFilter />
        <TodoList />
      </div>
    </div>
  );
}
export default Todo;
