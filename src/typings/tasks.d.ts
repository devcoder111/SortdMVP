import { firestore } from 'firebase';


export interface TaskType {
    content?: string;
    createdAt?: firestore.Timestamp;
    dueDate?: firestore.Timestamp;
    id: string;
    lead?: string;
    helper?: string;
    assessment?: string;
    project: string;
    change?: string;
    rank: string;
    scope?: number;
    stage: number;
    status: number;
    title: string;
    type: number;
    updatedAt: firestore.Timestamp;
    timeSpent: Array<TimeSpentType>;
    estimate?: number;
}

interface TimeSpentType {
    timeSpent: number;
    timeRemaining: number;
    createdAt: firestore.Timestamp;
    createdBy: string;
}

export interface TasksArray extends Array<TaskType> {}

  