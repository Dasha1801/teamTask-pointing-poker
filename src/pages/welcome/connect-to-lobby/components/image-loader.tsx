import React, { RefObject } from 'react';
import { Col, Row } from 'react-bootstrap';
import Avatar from './avatar';
import InputFile from './file-input/input-file';

interface IInputFileProps {
  fileName: string;
  filePath: string;
  playerName: string;
  image: RefObject<HTMLImageElement>;
  setFileName: (state: string) => void;
  setFilePath: (state: string) => void;
}

function ImageLoader(
  props: React.PropsWithChildren<IInputFileProps>
): JSX.Element {
  const { fileName, filePath, playerName, image, setFileName, setFilePath } =
    props;

  return (
    <Row>
      <Col lg={7}>
        <InputFile
          fileName={fileName}
          setFileName={setFileName}
          setFilePath={setFilePath}
        />
        <Avatar image={image} filePath={filePath} playerName={playerName} />
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
}

export default ImageLoader;
