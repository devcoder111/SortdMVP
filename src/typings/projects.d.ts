import { WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';
import { firestore } from 'firebase';

export interface ProjectType {
    createdAt: firestore.Timestamp;
    avatar?: string;
    createdBy: string;
    id: string;
    key: string;
    participants: string; //Should be array of UserTypes
    projectDescription: string;
    name: string;
    lead: string; //should be UserType
    projectStructure: ProjectTemplate;
    projectType: string;
    status: 0 | 1;
    stage: 1 | 2 | 3 | 4 | 5;

}

export interface ProjectArray extends Array<ProjectType> {}


export interface BoardDataType {
    columns: Map<string, ColumnType>;
    columnsOrder: Array<string>
}

export interface ColumnType {
    id: string;
    itemsId: Array<string>;

}

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    keys(): IterableIterator<K>;
    set(key: K, value?: V): Map<K, V>;
    size: number;
    values(): IterableIterator<V>;
    [Symbol.iterator]():IterableIterator<[K,V]>;
    [Symbol.toStringTag]: string;
}

export interface ProjectTemplate {
    id: string;
    key: string;
    avatar: string;
    createdAt?: firestore.Timestamp;
    description: string;
    boardData?: BoardDataType;
    title: string;
    type: string;
    }

export interface ProjectTemplateArray extends Array<ProjectTemplate> {}

export interface StateTypeTemplate  {
    project_types: Array<ProjectTemplate>;
    custom_project_types: Array<ProjectTemplate>;
}

    