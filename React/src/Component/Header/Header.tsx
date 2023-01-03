import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import '../../assets/css/header.css';
import { MyGlobalContext } from '../../store/Context/MyGlobalContext';
function Header (): JSX.Element {
  const { setSearchJob } = useContext(MyGlobalContext);
  return (
    <header style={{ flexGrow: 1 }}>
      <div className="wrapper">
        <div className="header">
          <span className="header__logo">Todo APP</span>
        </div>
        <div className="header__search">
          <div className="search-icon__wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
          </div>
          <div className="search-input__wrapper">
          <input type="text"
            className="search-input"
            placeholder='Search...'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchJob(e.target.value);
            }} />
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
