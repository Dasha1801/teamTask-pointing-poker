import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormConnectToLobby from './components/formConnectToLobby';

const ConnectToLobby = ({
  onCancelClick,
}: {
  onCancelClick: () => void;
}): JSX.Element => {
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
      <FormConnectToLobby onCancelClick={onCancelClick} />
    </BasePopup>
  );
};

export default ConnectToLobby;
