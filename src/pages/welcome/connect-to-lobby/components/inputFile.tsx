import styles from '../connect-to-lobby.module.scss';
import React, { useRef } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

interface IInputFileProps {
  fileName: string;
  setFileName: (state: string) => void;
  setFilePath: (state: string) => void;
}

function InputFile(
  props: React.PropsWithChildren<IInputFileProps>
): JSX.Element {
  const { fileName, setFileName, setFilePath } = props;

  const inputFile = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (inputFile.current?.files) {
      if (inputFile.current.files[0].size < 10485760) {
        setFileName(inputFile.current.files[0].name);
        setFilePath(window.URL.createObjectURL(inputFile.current.files[0]));
      } else {
        alert('The size of the files to download is limited to 10mb');
      }
    }
  };

  return (
    <>
      <Form.Label htmlFor="avatar" className={styles.label}>
        Image:
      </Form.Label>
      <InputGroup className={styles.field__wrapper} onChange={handleChange}>
        <FormControl
          className={styles.placeholder}
          value={fileName}
          placeholder="Choose footer"
          aria-describedby="basic-addon2"
          readOnly
        />
        <input
          ref={inputFile}
          id="avatar"
          type="file"
          className={styles.field__file}
        />
        <Form.Label htmlFor="avatar" className={styles.chooser}>
          Browse
        </Form.Label>
      </InputGroup>
    </>
  );
}

export default InputFile;
