import {required, SelectInput} from "react-admin";
import {SelectModel} from "../camundaFormTypes";

interface CamundaSelectInputProps {
  camundaComponent: SelectModel,
  disabled: boolean,
  width: string
}

export const CamundaSelectInput = ({camundaComponent, disabled, width}: CamundaSelectInputProps) => {
  const {key, label, description, validate, values, defaultValue} = camundaComponent;
  const validator = validate && validate.required ? required() : undefined;
  const helperText = description || false;
  return (
    <>
      <SelectInput source={key} sx={{width: width}}
                          choices={values}
                          optionText="label"
                          defaultValue={defaultValue}
                          optionValue="value"
                          disabled={disabled}
                          helperText={helperText}
                          label={label} translate="no"
                          validate={validator}/>
    </>
  );
};