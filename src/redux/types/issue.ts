import { TCardScore } from './card';

export type TRoundResult = Record<string, TCardScore>;

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
  lastRoundResult: TRoundResult;
}

type TIssueParameters = Omit<IIssue, 'priority' | 'link'> &
  Partial<Pick<IIssue, 'priority' | 'link'>>;

export class Issue implements IIssue {
  id = '';
  title = '';
  priority = TIssuePriority.medium;
  link = '';
  lastRoundResult: TRoundResult = {};

  constructor(issueParameters?: Partial<TIssueParameters>) {
    Object.assign(this, issueParameters);
  }

  toObject(): IIssue {
    return {
      id: this.id,
      title: this.title,
      priority: this.priority,
      link: this.link,
      lastRoundResult: this.lastRoundResult,
    };
  }

  static getRoundResultPercentages(issue: IIssue): number[] {
    const issueScores = Object.values(issue.lastRoundResult);
    const groupedVotes = issueScores.reduce(
      (acc: TIssueScoreStatistics, cur: TCardScore) => {
        const score = acc[cur];
        if (score !== undefined) {
          acc[cur] = score + 1;
        } else {
          acc[cur] = 1;
        }
        return acc;
      },
      {}
    );
    return Object.values(groupedVotes).map(
      (numberOfVotes) => ((numberOfVotes || 0) / issueScores.length) * 100
    );
  }
}

export interface IIssueScorePayload {
  playerId: string;
  issueId: string;
  score: TCardScore;
}

export interface IIssueUpdatePayload {
  issueId: string;
  issue: Partial<IIssue>;
}
