import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormConnectToLobby from './components/form-connect-to-lobby';

interface IConnectToLobbyProps {
  gameId: string;
  handleCancelClick: () => void;
}

const ConnectToLobby = ({
  handleCancelClick,
  gameId,
}: IConnectToLobbyProps): JSX.Element => {
  return (
    <BasePopup
      buttonOkText="Confirm"
      buttonCancelText="Cancel"
      buttonCancelProps={{ onClick: handleCancelClick }}
      buttonOkProps={{
        form: 'textId',
        type: 'submit',
      }}
    >
      <FormConnectToLobby
        gameId={gameId}
        handleCancelClick={handleCancelClick}
      />
    </BasePopup>
  );
};

export default ConnectToLobby;
