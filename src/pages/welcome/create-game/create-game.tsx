import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormCreateGame from './form-create-game/form-create-game';

interface ICreateGameProps {
  handleCancelClick: () => void;
}

const CreateGame = ({ handleCancelClick }: ICreateGameProps): JSX.Element => {
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
      <FormCreateGame onCancelClick={handleCancelClick} />
    </BasePopup>
  );
};

export default CreateGame;
