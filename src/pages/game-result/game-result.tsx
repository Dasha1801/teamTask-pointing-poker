import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../redux/selectors/game-selectors';
import { IIssue, TCardScore, TIssueScoreStatistics } from '../../redux/types';
import IssueCard from '../game/issue-card/issue-card';
import PlayCard from '../shared/cards/card';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import styles from './game-result.module.scss';

const GameResult = (): JSX.Element => {
  const issues = useSelector(gameSelectors.selectIssues);
  function getRoundResult(issue: IIssue): Array<[string, number | undefined]> {
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
    return Object.entries(groupedVotes);
  }

  return (
    <div className={styles.pageGameResult}>
      <div className={styles.headingContainer}>
        <SprintHeading issues={issues} />
      </div>
      <div className={styles.setOfIssues}>
        {issues.map((issue) => {
          return (
            <div className={styles.issueCardContainer} key={issue.id}>
              <IssueCard
                key={issue.id}
                issue={issue}
                canEditScore={false}
                canRemove={false}
              />

              <div className={styles.issueStatisticBlock} key={issue.id}>
                {getRoundResult(issue).map(
                  (
                    groupedVotes: [string, number | undefined],
                    index: number
                  ) => {
                    return (
                      <div
                        className={styles.groupedVotes}
                        key={`${groupedVotes}_${index}`}
                      >
                        <PlayCard
                          key={`${groupedVotes}_${index}`}
                          cardValue={groupedVotes[0] as TCardScore}
                          mode="single"
                          selectedCard={''}
                        />
                        <div className={styles.percentageCard}>
                          {(
                            (+(groupedVotes[1] || 0) /
                              Object.values(issue.lastRoundResult).length) *
                            100
                          ).toFixed(1) + '%'}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameResult;
