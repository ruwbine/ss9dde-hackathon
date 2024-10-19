
    // Home.tsx
    import React from 'react';
    import './Home.scss'; // Стиль для домашней страницы
    import logoSmall from '../../assets/assignment.png';
    import './card.scss'
    import { ICourse } from './cource';
    interface CardProps {
        course: ICourse;
        onClick?: React.MouseEventHandler<HTMLDivElement>;
    }
    const Cards: React.FC<CardProps> = ({course, onClick }) => {
    return (
        <div className="task-card" onClick={onClick} style={{ cursor: 'pointer' }} >
            <img src={logoSmall} alt="logo" />
                <div className="task-details">
                <div className="title">
                    <h3 className="task-title">{course.title}</h3>
                    <div className="task-time">
                    <span>48 hours</span>
                </div>
            </div>
            <p className="task-tip">{course.description}</p>
            </div>
            <div className="task-level">
                <span className="task-level-label">High</span>
            </div>
        </div>
    );
    };
    export default Cards;
