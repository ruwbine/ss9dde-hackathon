// Home.tsx
import React from 'react';
import './Home.scss'; // Стиль для домашней страницы
import Sidebar from './sidebar';

const Account: React.FC = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Safak Kocaoglu</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
