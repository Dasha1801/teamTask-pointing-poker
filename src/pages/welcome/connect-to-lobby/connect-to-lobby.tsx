import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormConnectToLobby from './components/form-connect-to-lobby';

interface IConnectToLobbyProps {
  gameId: string;
  onCancelClick: () => void;
}

const ConnectToLobby = ({
  onCancelClick,
  gameId,
}: IConnectToLobbyProps): JSX.Element => {
  return (
    <BasePopup
      buttonOkText="Confirm"
      buttonCancelText="Cancel"
      buttonCancelProps={{ onClick: onCancelClick }}
      buttonOkProps={{
        form: 'textId',
        type: 'submit',
      }}
    >
      <FormConnectToLobby gameId={gameId} onCancelClick={onCancelClick} />
    </BasePopup>
  );
};

export default ConnectToLobby;
