// src/Register.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './register.scss'; // Импорт стилей

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const onRegister = (data: any) => {
    console.log(data);
    // Здесь можно добавить логику регистрации
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Регистрация</h1>
        <div className="login-sign-up">
          <div className="login-sign-up-container">
            <p>Уже есть аккаунт?</p>
            <button onClick={() =>navigate('/auth/login')}>
              Войти сейчас
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onRegister)}>
          <div className="login-inputs">
            {/* Поле для ввода имени пользователя */}
            <label htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              type="text"
              placeholder="Введите имя"
              {...register('username', { required: true, minLength: 3 })}
            />
            {errors.username && (
              <div className="error-message">
                {errors.username.type === 'required' && <div>Поле обязательно для заполнения.</div>}
                {errors.username.type === 'minLength' && <div>Имя должно содержать минимум 3 символа.</div>}
              </div>
            )}

            {/* Поле для ввода email */}
            <label htmlFor="email">Почта</label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <div className="error-message">
                {errors.email.type === 'required' && <div>Поле обязательно для заполнения.</div>}
                {errors.email.type === 'pattern' && <div>Неверный формат почты.</div>}
              </div>
            )}

            {/* Поле для ввода пароля */}
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && (
              <div className="error-message">
                {errors.password.type === 'required' && <div>Поле обязательно для заполнения.</div>}
                {errors.password.type === 'minLength' && <div>Пароль должен содержать минимум 6 символов.</div>}
              </div>
            )}
          </div>
          <button type="submit" className="login-btn" disabled={!errors}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
