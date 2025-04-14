// src/Login.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { useForm } from 'react-hook-form';
import {Axios} from 'axios';
import './login.scss';

const axios = new Axios();

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); 
  
  const onLogin = (data: any) => {
    axios.post('localhost:3000/auth/login', {
      data
    })
    .then((res) => res.json())
    .catch(() => console.error('Something went wrong via login', ))
  };

  return (
    <div id="login">
      <div className="login">
        <div className="login-container">
          <h1>Войти</h1>
          <div className="subtitle">Hi, welcome back👋</div>
          <div className="login-sign-up">
            <div className="login-sign-up-container">
              <p>New here?</p>
              <button onClick={() => navigate('/auth/registration')}>
                Создать учетную запись
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="login-inputs">
              <label htmlFor="email">Почта</label>
              <input
                id="email"
                type="text"
                placeholder="example@gmail.com"
                {...register('email', { required: true, minLength: 6 })}
              />
              {errors.email && errors.email.type === 'required' && (
                <div className="error-message">Поле обязательно для заполнения.</div>
              )}
              {errors.email && errors.email.type === 'minLength' && (
                <div className="error-message">Неверный формат почты.</div>
              )}
              
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                type="password"
                placeholder="ABC@#$!12"
                {...register('password', { required: true, minLength: 6 })}
              />
              {errors.password && errors.password.type === 'required' && (
                <div className="error-message">Поле обязательно для заполнения.</div>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <div className="error-message">Пароль должен содержать минимум 6 символов.</div>
              )}
            </div>
            <div className="login-action-container">
              <div className="login-remember-me">
                Запомнить меня
                <input type="checkbox" />
              </div>
              <button type="button" onClick={() => alert('Forgot Password clicked')}>
                Забыл Пароль?
              </button>
            </div>
            <button type="submit" className="login-btn">
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
