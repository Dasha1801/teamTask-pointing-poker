import styles from '../connect-to-lobby.module.scss';
import React, { RefObject } from 'react';

interface IAvatarProps {
  image: RefObject<HTMLImageElement>;
  filePath: string;
  playerName: string;
}

function Avatar(props: React.PropsWithChildren<IAvatarProps>): JSX.Element {
  const { image, filePath, playerName } = props;

  return (
    <div
      className={styles.avatar}
      style={{
        background: `no-repeat center/cover url(${filePath}) #60DABF`,
      }}
    >
      {filePath === '' && playerName}
      <img ref={image} src={filePath} alt="" style={{ display: 'none' }} />
    </div>
  );
}

export default Avatar;
