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
  score: number;
}

type TIssueParameters = Omit<IIssue, 'priority' | 'link'> &
  Partial<Pick<IIssue, 'priority' | 'link'>>;

export class Issue implements IIssue {
  id = '';
  title = '';
  priority = TIssuePriority.medium;
  link = '';
  lastRoundResult: TRoundResult = {};
  score = 0;

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
      score: this.score,
    };
  }

  static getRoundScore(issue: IIssue): number | string {
    const issueScores = Object.values(issue.lastRoundResult);
    const sum = issueScores.reduce((acc: number, cur) => {
      return typeof cur === 'number' ? acc + cur : acc;
    }, 0);
    return Math.trunc(sum / (issueScores.length || 1));
  }

  static calculateStatistics(issue: IIssue): TIssueScoreStatistics {
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
    Object.keys(groupedVotes).forEach((numberOfVotes) => {
      const key = parseInt(numberOfVotes);
      groupedVotes[key] = ((key || 0) / issueScores.length) * 100;
    });
    return groupedVotes;
    // return Object.values(groupedVotes).map(
    //   (numberOfVotes) => ((numberOfVotes || 0) / issueScores.length) * 100
    // );
  }
}

export interface IIssueScorePayload {
  playerId: string;
  issueId: string;
  score: TCardScore;
}

export interface IIssueUpdatePayload {
  issueId: string;
  updatedIssue: Partial<IIssue>;
}
