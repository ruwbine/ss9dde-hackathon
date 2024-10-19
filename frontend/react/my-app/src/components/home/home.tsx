// Home.tsx
import React from 'react';
import './Home.scss'; // Стиль для домашней страницы
import Sidebar from './sidebar';
import Cards from './card';
import { ICourse } from './cource';
import { useNavigate } from 'react-router-dom';

const exampleCourse: ICourse = {
    id: '1',
    title: 'Math practice',
    description: 'Boost your skills in analyzing data, graphs, and solving problems for exams.',
    createdAt: new Date(),
    updatedAt: new Date(),
    modules: [] // Optional modules
};

const Home: React.FC = () => {
    const navigate = useNavigate(); // Переместили сюда

    const handleCardClick = (courseId: string) => {
        navigate(`/course/${courseId}`); // Navigate to a specific course detail page
    };

    return (
        <div className="home">
            <Sidebar />
            <div className="content">
                <div className="header-content">
                    <h1>Home</h1>
                </div>
                <div className="blocks">
                    {[...Array(3)].map((_, index) => (
                        <Cards 
                            key={index} 
                            course={exampleCourse} 
                            onClick={() => handleCardClick(exampleCourse.id)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
