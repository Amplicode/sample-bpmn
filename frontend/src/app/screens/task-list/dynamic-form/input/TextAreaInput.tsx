import {useCallback} from "react";
import {maxLength, minLength, required, TextInput, Validator} from "react-admin";
import {TextAreaModel} from "../camundaFormTypes";

interface BasicInputProps {
  camundaComponent: TextAreaModel,
  disabled: boolean,
  width: string
}

export const TextAreaInput = ({camundaComponent, disabled, width}: BasicInputProps) => {
  const {key, label, description, validate, defaultValue} = camundaComponent;

  const createValidators = useCallback(() => {
    if (!validate) {
      return undefined;
    }
    const validators: Validator[] = [];
    if (validate.required) {
      validators.push(required());
    }

    if (validate.maxLength) {
      validators.push(maxLength(validate.maxLength));
    }

    if (validate.minLength) {
      validators.push(minLength(validate.minLength));
    }

    return validators;
  }, [validate]);
  const validators = createValidators();

  const helperText = description || false;
  return (
    <>
      <TextInput source={key}
                 multiline={true}
                 rows={4}
                 defaultValue={defaultValue}
                 sx={{width: width}}
                 disabled={disabled}
                 helperText={helperText}
                 label={label} translate="no"
                 validate={validators}
      />
    </>
  );
};