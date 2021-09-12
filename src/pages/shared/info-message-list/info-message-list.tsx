import styles from './info-message-list.module.scss';
import React from 'react';
import { IInfoMessage } from '../../../redux/types/info-message';
import InfoMessage from '../info-message/info-message';

interface IInfoMessageListProps {
  messages: IInfoMessage[];
}

export default function InfoMessageList({
  messages,
}: IInfoMessageListProps): JSX.Element {
  return (
    <ul className={styles.infoMessageList}>
      {messages.map((message) => (
        <li key={message.id}>
          <InfoMessage message={message} />
        </li>
      ))}
    </ul>
  );
}
