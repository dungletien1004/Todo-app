import React from 'react';
import Header from '../Component/Header/Header';
import SideBar from '../Component/SideBar/SideBar';
import Todo from './Todo';
function TodoLayout (): JSX.Element {
  return (
    <>
      <Header />
      <div className="content">
        <SideBar />
        <Todo />
      </div>
    </>
  );
}
export default TodoLayout;
