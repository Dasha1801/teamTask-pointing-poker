import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../redux/selectors/game-selectors';
import { Issue, TCardScore } from '../../redux/types';
import PlayCard from '../game/cards/card';
import IssueCard from '../game/issue-card/issue-card';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import styles from './game-result.module.scss';

const GameResult = (): JSX.Element => {
  const issues = useSelector(gameSelectors.selectIssues);
<<<<<<< HEAD
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
=======

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function getRoundResult(issue: IIssue): any {
  //   const issueScores = Object.values(issue.lastRoundResult);
  //   const groupedVotes = issueScores.reduce(
  //     (acc: TIssueScoreStatistics, cur: TCardScore) => {
  //       const score = acc[cur];
  //       if (score !== undefined) {
  //         acc[cur] = score + 1;
  //       } else {
  //         acc[cur] = 1;
  //       }
  //       return acc;
  //     },
  //     {}
  //   );
  //   return Object.entries(groupedVotes);
  // }
>>>>>>> feat: implement admit/reject window

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
<<<<<<< HEAD
                {getRoundResult(issue).map(
                  (
                    groupedVotes: [string, number | undefined],
                    index: number
                  ) => {
=======
                {Object.entries(Issue.calculateStatistics(issue)).map(
                  ([score, percentage]) => {
>>>>>>> feat: implement admit/reject window
                    return (
                      <div className={styles.groupedVotes} key={`${score}`}>
                        <PlayCard
<<<<<<< HEAD
                          key={`${groupedVotes}_${index}`}
                          cardValue={groupedVotes[0] as TCardScore}
=======
                          key={`${score}`}
                          cardValue={score as TCardScore}
>>>>>>> feat: implement admit/reject window
                          mode="single"
                          isSelected={false}
                          handleClick={() => undefined}
                        />
                        <div className={styles.percentageCard}>
<<<<<<< HEAD
                          {(
                            (+(groupedVotes[1] || 0) /
                              Object.values(issue.lastRoundResult).length) *
                            100
                          ).toFixed(1) + '%'}
=======
                          {`${percentage}%`}
>>>>>>> feat: implement admit/reject window
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
