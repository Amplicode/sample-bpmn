import {useCallback} from "react";
import {email, maxLength, minLength, regex, required, TextInput, Validator} from "react-admin";
import {TextFieldModel} from "../camundaFormTypes";
import InputAdornment from '@mui/material/InputAdornment';

interface TextFieldInputProps {
  camundaComponent: TextFieldModel,
  disabled: boolean,
  width: string
}

export const TextFieldInput = ({camundaComponent, disabled, width}: TextFieldInputProps) => {
  const {key, label, description, validate, defaultValue, appearance} = camundaComponent;

  const createValidators = useCallback(() => {
    if (!validate) {
      return undefined;
    }
    const validators: Validator[] = [];
    if (validate.required) {
      validators.push(required());
    }
    if (validate.validationType === "email") {
      validators.push(email());
    }

    if (validate.pattern) {
      validators.push(regex(validate.pattern));
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
      <TextInput source={key} label={label} translate="no" helperText={helperText}
                 InputProps={appearance ? {
                   startAdornment: <InputAdornment position="start">
                     {appearance?.prefixAdorner}
                   </InputAdornment>, endAdornment: <InputAdornment position="end">
                     {appearance?.suffixAdorner} </InputAdornment>
                 } : undefined}
                 defaultValue={defaultValue} validate={validators} disabled={disabled}
                 sx={{width: width}}/>
    </>
  );
};