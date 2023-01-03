import React from 'react';
import './assets/css/App.css';
import TodoLayout from './container/TodoLayout';
import { GlobalContextWrapper } from './store/Context/MyGlobalContext';
function App (): JSX.Element {
  return (
    <div className="App">
      <GlobalContextWrapper>
        <TodoLayout/>
      </GlobalContextWrapper>
    </div>
  );
}

export default App;
