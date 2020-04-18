import {RouterTypes} from 'umi'


export interface MatchProps extends RouterTypes<MatchParams> {
    isExact: boolean;
    path: string;
    url: string;
  }

  interface MatchParams {
    id?: string;
    stakeholder?: string;
    assessment?: string;
    type?: string;
    project?: string;
    scope?: string;
  }

  interface ProjectMatchParams {
    id: string
  }

  interface ProjectMatchProps extends MatchProps {
    params: ProjectMatchParams;
  }