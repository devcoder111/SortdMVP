import { ProjectTemplate } from "./projects";

export interface Settings {
    settings: {
        sizing: ProjectSizingSettings;
        details: ProjectDetailSettings;
    }
    project_types?: Array<ProjectTemplate>;
    status?: 'ok' | 'error'
}

export interface ProjectSizingSettings {
    small_project_team: number,
    large_project_team: number,
    small_project_length: number,
    large_project_length: number,
    small_project_cost: number,
    large_project_cost: number,
    team_weighting: number,
    length_weighting: number,
    complexity_weighting: number,
    cost_weighting: number,
    department_weighting: number,
    dependencies_weighting: number,
    small_project: string,
    medium_project: string,
    large_project: string
}

export interface ProjectDetailSettings {
    project_stages: {
        stage_1: string,
        stage_2: string,
        stage_3: string,
        stage_4: string,
        stage_5: string
    }
}
