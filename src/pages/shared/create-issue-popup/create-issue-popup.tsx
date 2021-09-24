import React from 'react';
import { BasePopup } from '../base-popup/base-popup';
import CreateIssueForm, {
  ICreateIssueFormProps,
} from './create-issue-form/create-issue-form';

interface ICreateIssuePopup extends ICreateIssueFormProps {
  handleClose: () => void;
  handleSubmit: () => void;
}

export function CreateIssuePopup({
  handleClose,
  handleSubmit,
  info,
  setIssueFields,
  warning,
}: ICreateIssuePopup): JSX.Element {
  return (
    <BasePopup
      buttonCancelProps={{ onClick: handleClose }}
      buttonOkProps={{ onClick: handleSubmit }}
      buttonCancelText="No"
      buttonOkText="Yes"
    >
      <CreateIssueForm
        info={info}
        setIssueFields={setIssueFields}
        warning={warning}
      />
    </BasePopup>
  );
}
