import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { IChangeCurrentIssueResponseWS } from '../../types';

export default function currentIssueChanged({
  issueId,
}: IChangeCurrentIssueResponseWS): void {
  console.log('issue changed', issueId);
  store.dispatch(gameActions.changeCurrentIssueId(issueId));
}
