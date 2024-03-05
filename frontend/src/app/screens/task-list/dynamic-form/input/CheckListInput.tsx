import {CheckboxGroupInput, required} from "react-admin";
import {CheckListModel} from "../camundaFormTypes";

interface CheckListInputProps {
  camundaComponent: CheckListModel,
  disabled: boolean,
  width: string
}

export const CheckListInput = ({camundaComponent, disabled}: CheckListInputProps) => {
  const {key, label, description, validate, values} = camundaComponent;
  const validator = validate && validate.required ? required() : undefined;
  const helperText = description || false;
  return (
    <>
      <CheckboxGroupInput source={key}
                          choices={values}
                          optionText="label"
                          optionValue="value"
                          disabled={disabled}
                          row={false}
                          helperText={helperText}
                          label={label} translate="no"
                          validate={validator} translateChoice={false}/>
    </>
  );
};