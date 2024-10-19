// Home.tsx
import React from 'react';
import './Home.scss'; // Стиль для домашней страницы
import Sidebar from './sidebar';
import AssignmentList from './assignment';

const CourseDetail: React.FC = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="content">
        <AssignmentList />
      </div>
    </div>
  );
};

export default CourseDetail;
