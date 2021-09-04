import { TCardScore } from './card';

export type TIssueScoreStatistics = { [key in TCardScore]?: number };

export enum TIssuePriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
export interface IIssue {
  id: string;
  title: string;
  priority: TIssuePriority;
  link: string;
  statistics: TIssueScoreStatistics;
}

type TIssueParameters = Omit<IIssue, 'priority' | 'link'> &
  Partial<Pick<IIssue, 'priority' | 'link'>>;

export class Issue implements IIssue {
  id: string;
  title: string;
  priority: TIssuePriority;
  link: string;
  statistics: TIssueScoreStatistics;

  constructor({
    id,
    title,
    priority = TIssuePriority.medium,
    link = '',
    statistics,
  }: TIssueParameters) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.link = link;
    this.statistics = statistics;
  }
}

export interface IIssueScorePayload {
  issueId: string;
  score: TCardScore;
}

export interface IIssueUpdatePayload {
  issueId: string;
  issue: Partial<IIssue>;
}
