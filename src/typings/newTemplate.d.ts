import {firestore} from 'firebase'

interface BoardItemType {
    id: string;
    type: number;
    title: string;
    description?: string;
    assessment?: string;
    column: string;
    rank: string;
}

export interface BoardItemsType extends Array<BoardItemType> {}

export interface NewProjectStateType {
    items: Array<BoardItemType>
}