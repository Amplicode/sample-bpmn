import {BooleanInput, required} from "react-admin";
import {CheckBoxModel} from "../camundaFormTypes";

interface BasicInputProps {
  camundaComponent: CheckBoxModel,
  disabled: boolean,
  width: string
}

export const CheckBoxInput = ({camundaComponent, disabled, width}: BasicInputProps) => {
  const {key, label, description, validate, defaultValue} = camundaComponent;
  const validator = validate && validate.required ? required() : undefined;
  const helperText = description || false;
  return (
    <>
      <BooleanInput source={key}
                    sx={{width: width}}
                    disabled={disabled}
                    defaultChecked={defaultValue}
                    helperText={helperText}
                    label={label} translate="no"
                    validate={validator}
      />
    </>
  );
};