import {AutocompleteArrayInput, required} from "react-admin";
import {TagListModel} from "../camundaFormTypes";

interface TagListInputProps {
  camundaComponent: TagListModel,
  disabled: boolean,
  width: string
}

export const TagListInput = ({camundaComponent, disabled, width}: TagListInputProps) => {
  const {key, label, description, validate, values} = camundaComponent;

  const validator = validate && validate.required ? required() : undefined;
  const helperText = description || false;
  return (
    <>
      <AutocompleteArrayInput source={key} sx={{width: width}}
                              choices={values}
                              optionText="label"
                              optionValue="value"
                              disabled={disabled}
                              helperText={helperText}
                              label={label} translate="no"
                              validate={validator}/>
    </>
  );
};