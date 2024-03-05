import {RadioButtonGroupInput, required} from "react-admin";
import {RadioModel} from "../camundaFormTypes";

interface RadioInputProps {
  camundaComponent: RadioModel,
  disabled: boolean,
  width: string
}

export const RadioInput = ({camundaComponent, disabled, width}: RadioInputProps) => {
  const {key, label, description, validate, values, defaultValue} = camundaComponent;
  const validator = validate && validate.required ? required() : undefined;
  const helperText = description || false;
  return (
    <>
      <RadioButtonGroupInput source={key} sx={{width: width}}
                             choices={values}
                             defaultValue={defaultValue}
                             optionText="label"
                             optionValue="value"
                             disabled={disabled}
                             helperText={helperText}
                             label={label} translate="no"
                             validate={validator}/>
    </>
  );
};