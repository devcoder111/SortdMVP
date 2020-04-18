import { firestore } from 'firebase';

export interface ChangeType {
      id: string;
      name: string;
      description?: string;
      createdBy?: string;
      createdAt?: firestore.Timestamp;
      changestart?: firestore.Timestamp;
      changeend?: firestore.Timestamp;
      currentstate?: string;
      futurestate?: string;
      changelead?: string;
      peopleimpact?: string;
      process?: string;
      project?: string;
      roles?: string;
      skills?: string;
      systems?: string;
      behavioursupport?: 'High' | 'Medium' | 'Low' | 'None';
      customersupport?: 'High' | 'Medium' | 'Low' | 'None';
      jobsupport?: 'High' | 'Medium' | 'Low' | 'None';
      processsupport?: 'High' | 'Medium' | 'Low' | 'None';
      systemssupport?: 'High' | 'Medium' | 'Low' | 'None';
  }

  export interface ChangeArray extends Array<ChangeType> {}

  export interface ChangeTypeArray {
    forEach: any;
    changes?: ChangeArray
    projectChanges?: ChangeArray
  }

  export enum Assessments {
    'Stakeholder Assessment',
    'Readiness Assessment',
    'High-Level Impact Assessment',
    'Impact Assessment'
  }
