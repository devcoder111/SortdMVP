export interface TaskStatuses {
    color: string;
    order: number;
    title: string;
}

export interface TaskStatusesArray extends Array<TaskStatuses> {}