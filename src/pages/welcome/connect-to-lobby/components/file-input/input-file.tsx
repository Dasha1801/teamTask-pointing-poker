import React, { useRef } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { appActions } from '../../../../../redux/slices/app/app-slice';
import { InfoMessage } from '../../../../../redux/types/info-message';
import lobbyStyles from '../../connect-to-lobby.module.scss';
import styles from './input-file.module.scss';

interface IInputFileProps {
  fileName: string;
  setFileName: (state: string) => void;
  setFilePath: (state: string) => void;
}

function InputFile(
  props: React.PropsWithChildren<IInputFileProps>
): JSX.Element {
  const { fileName, setFileName, setFilePath } = props;
  const dispatch = useDispatch();

  const inputFile = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (inputFile.current?.files) {
      if (inputFile.current.files[0].size < 10485760) {
        setFileName(inputFile.current.files[0].name);
        setFilePath(window.URL.createObjectURL(inputFile.current.files[0]));
      } else {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage('The file must be at most 10Mb')
          )
        );
      }
    }
  };

  return (
    <>
      <Form.Label htmlFor="avatar" className={lobbyStyles.label}>
        Image:
      </Form.Label>
      <InputGroup
        className={lobbyStyles.field__wrapper}
        onChange={handleChange}
      >
        <FormControl
          className={lobbyStyles.placeholder}
          value={fileName}
          placeholder="Upload image"
          aria-describedby="basic-addon2"
          readOnly
        />
        <input
          ref={inputFile}
          id="avatar"
          type="file"
          accept="image/png,image/jpeg"
          className={lobbyStyles.field__file}
        />
        <Form.Label htmlFor="avatar" className={styles.chooser}>
          Browse
        </Form.Label>
      </InputGroup>
    </>
  );
}

export default InputFile;
