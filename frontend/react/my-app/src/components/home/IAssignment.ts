// src/interfaces/assignment.interface.ts

export interface IAssignment {
    id: string;
    title: string;
    description: string;
    moduleId: string;
    createdAt: Date;
    updatedAt: Date;
    questions: IAssignmentQuestion[];
    submissions: IAssignmentSubmission[];
  }
  
  export interface IAssignmentQuestion {
    id: string;
    questionText: string;
    assignmentId: string;
  }
  
  export interface IAssignmentSubmission {
    id: string;
    submissionText: string;
    assignmentId: string;
    userId: string;
    submittedAt: Date;
  }
  