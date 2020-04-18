import { firestore } from 'firebase';

export interface BusinessUnitType {
    id: string;
    avatar?: string;
    bulead: string;
    businessunit: string;
    createdAt: firestore.Timestamp;
    createdBy: string;
    people: number;
  }

  export interface BusinessUnitArray extends Array<BusinessUnitType> {}
