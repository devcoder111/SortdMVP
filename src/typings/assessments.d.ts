export interface AssessmentsArray extends Array<AssessmentType> {}

export interface AssessmentType {
  id: string;
  title: string;
  description: string;
  active: boolean;
}