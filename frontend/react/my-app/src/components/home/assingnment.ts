import { IAssignment } from './IAssignment';

const API_URL = 'https://localhost:3000'; 

export class AssignmentService {
  // Получить все задания
  static async getAssignments(): Promise<IAssignment[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Ошибка при получении заданий');
    }
    return await response.json();
  }

  // Создать новое задание
  static async createAssignment(data: Partial<IAssignment>): Promise<IAssignment> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Ошибка при создании задания');
    }
    return await response.json();
  }

  // Обновить задание
  static async updateAssignment(id: string, data: Partial<IAssignment>): Promise<IAssignment> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Ошибка при обновлении задания');
    }
    return await response.json();
  }

  // Удалить задание
  static async deleteAssignment(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Ошибка при удалении задания');
    }
  }
}
