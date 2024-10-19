// Home.tsx
import React from 'react';
import './Home.scss'; // Стиль для домашней страницы
import Sidebar from './sidebar';
import Cards from './card';
import { ICourse } from './cource';
import { useNavigate } from 'react-router-dom';
const History: React.FC = () => {
    const navigate = useNavigate(); // Переместили сюда

    const handleCardClick = (courseId: string) => {
        navigate(`/course/${courseId}`); // Navigate to a specific course detail page
    };

    return (
        <div className="home">
            <Sidebar />
 
        </div>
    );
};

export default History;
