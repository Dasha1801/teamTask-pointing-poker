import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormCreateGame from './form-create-game/form-create-game';

interface ICreateGameProps {
  onCancelClick: () => void;
}

const CreateGame = ({ onCancelClick }: ICreateGameProps): JSX.Element => {
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
      <FormCreateGame onCancelClick={onCancelClick} />
    </BasePopup>
  );
};

export default CreateGame;
