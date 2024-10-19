// Sidebar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faUser, faCog, faBorderAll } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';
import logoBig from '../../assets/logo-big.png';
import logoSmall from '../../assets/logo.png';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo-container">
        <button className="toggle-button" onClick={toggleSidebar}>
          <img
            src={isCollapsed ? logoSmall : logoBig}
            alt="Logo"
          />
        </button>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <NavLink 
              to="/home" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FontAwesomeIcon icon={faHome} className="icon" />
              {!isCollapsed && <span className="link-text">Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cources" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FontAwesomeIcon icon={faBorderAll} className="icon" />
              {!isCollapsed && <span className="link-text">Courses</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/history" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FontAwesomeIcon icon={faHistory} className="icon" />
              {!isCollapsed && <span className="link-text">History</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/user" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FontAwesomeIcon icon={faUser} className="icon" />
              {!isCollapsed && <span className="link-text">User</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FontAwesomeIcon icon={faCog} className="icon" />
              {!isCollapsed && <span className="link-text">Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
