import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/login'; 
import './App.scss'
import Register from './components/auth/register';
import Home from './components/home/home';
import CourseDetail from './components/home/courcedetail';
import Account from './components/home/account';
import Quiz from './components/home/quiz';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" Component={Login} />
        <Route path="/auth/registration"Component={Register}/>
        <Route path="/home"Component={Home}/>
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/account" element={<Account/>} />
        <Route path="/quiz" Component={Quiz} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};
export default App;