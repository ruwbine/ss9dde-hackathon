// src/components/AssignmentList.tsx

import React, { useEffect, useState } from 'react';
import { AssignmentService } from './assingnment';
import { IAssignment } from './IAssignment';
import { useNavigate } from 'react-router-dom';

const AssignmentList: React.FC = () => {
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [hoveredAssignmentId, setHoveredAssignmentId] = useState<string | null>(null);
  // Получаем список заданий при загрузке компонента
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await AssignmentService.getAssignments();
        setAssignments(data);
      } catch (error) {
        setError('Не удалось загрузить задания');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);


  const handleQuizButtonClick = (assignmentId: string) => {
    navigate('/quiz?assignmentId=${assignmentId}')
  };

  const handleCreateAssignment = async () => {
    try {
      const newAssignment = {
        title: 'New Assignment',
        description: 'Описание нового задания',
        moduleId: '123', // Пример идентификатора модуля
      };
      const createdAssignment = await AssignmentService.createAssignment(newAssignment);
      setAssignments([...assignments, createdAssignment]);
    } catch (error) {
      setError('Не удалось создать задание');
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
    <h1>Список заданий</h1>
    <button onClick={handleCreateAssignment}>Создать задание</button>
    <ul>
      {assignments.map((assignment) => (
        <li key={assignment.id}>
          <div 
            onMouseEnter={() => setHoveredAssignmentId(assignment.id)} 
            onMouseLeave={() => setHoveredAssignmentId(null)}
            style={{ position: 'relative' }} 
          >
            <h2>{assignment.title}</h2>
            <p>{assignment.description}</p>
            {hoveredAssignmentId === assignment.id && (
              <button 
                onClick={() => handleQuizButtonClick(assignment.id)} 
                style={{ position: 'absolute', top: '0', right: '0' }} 
              >
                Квиз
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default AssignmentList;
