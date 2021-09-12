import styles from '../connect-to-lobby.module.scss';
import React, { useRef, useState } from 'react';
import { Form, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { TUserRole, User } from '../../../../redux/types';
import { thunks } from '../../../../redux/thunks/thunks';
import Switcher from './swither';
import HeadingText from './headingText';
import FirstName from './firstName';
import LastName from './lastName';
import JobPosition from './jobPosition';
import ImageLoader from './imageLoader';

export type FormData = {
  firstName: string;
  lastName: string;
  jobPosition: string;
  base64: string | undefined;
  isObserver: boolean;
};

const FormConnectToLobby = ({
  onCancelClick,
}: {
  onCancelClick: () => void;
}): JSX.Element => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const image = useRef<HTMLImageElement>(null);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState<string>('');
  const [playerName, setPlayerName] = useState('NN');

  function toBase64String(img: HTMLImageElement | null): string | undefined {
    const c = document.createElement('canvas');
    let ctx, base64String;
    if (img && fileName !== '') {
      const minSide = Math.min(img.naturalHeight, img.naturalWidth);
      if (img.naturalHeight > minSide) {
        c.height = (img.naturalHeight / minSide) * 100;
        c.width = 100;
      } else {
        c.height = 100;
        c.width = (img.naturalWidth / minSide) * 100;
      }
      ctx = c.getContext('2d');
      if (ctx) ctx.drawImage(img, 0, 0, c.width, c.height);
      base64String = c.toDataURL(); //.replace(/^data:image.+;base64,/, '')
    } else {
      base64String = '';
    }
    return base64String;
  }

  const onConfirmClick = handleSubmit((data) => {
    let base64String: string | undefined;
    if (image.current) base64String = toBase64String(image.current);
    (async function () {
      const currentUser = new User({
        id: '',
        role: data.isObserver ? TUserRole.observer : TUserRole.player,
        firstName: data.firstName,
        lastName: data.lastName,
        jobPosition: data.jobPosition,
        image: base64String,
      });
      await dispatch(thunks.addPlayerThunk({ addedPlayer: currentUser }));
    })();
    onCancelClick();
  });

  const handleChangeInput = handleSubmit((data) => {
    if (fileName !== '') {
    } else {
      if (data.lastName === '') {
        setPlayerName(
          `${data.firstName.slice(0, 1).toUpperCase()}${data.firstName
            .slice(-1)
            .toUpperCase()}`
        );
      } else if (data.lastName !== '') {
        setPlayerName(
          `${data.firstName.slice(0, 1).toUpperCase()}${data.lastName
            .slice(0, 1)
            .toUpperCase()}`
        );
      }
    }
  });

  return (
    <Form id="textId" className={styles.connect} onSubmit={onConfirmClick}>
      <Container className={styles.container}>
        <Row className={styles.rowTitle}>
          <HeadingText />
          <Switcher reg={{ ...register('isObserver') }} />
        </Row>
        <FirstName
          handleChangeInput={handleChangeInput}
          reg={{
            ...register('firstName', {
              validate: {
                noName: (value) => value !== '',
                tooShort: (value) => value.length >= 3,
                tooLong: (value) => value.length <= 20,
              },
            }),
          }}
          errors={{ ...errors }}
        />
        <LastName
          handleChangeInput={handleChangeInput}
          reg={{ ...register('lastName') }}
        />
        <JobPosition reg={{ ...register('jobPosition') }} />
        <ImageLoader
          image={image}
          fileName={fileName}
          filePath={filePath}
          playerName={playerName}
          setFileName={setFileName}
          setFilePath={setFilePath}
        />
      </Container>
    </Form>
  );
};

export default FormConnectToLobby;
