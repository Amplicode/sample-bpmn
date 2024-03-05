import {maxValue, minValue, NumberInput, required, Validator} from "react-admin";
import {useCallback} from "react";
import {NumberModel} from "../camundaFormTypes";
import InputAdornment from "@mui/material/InputAdornment";
import {formatNumber} from "../../../../../core/format/formatNumber";
import {parseNumber} from "../../../../../core/format/parseNumber";

interface CamundaNumberInputProps {
  camundaComponent: NumberModel,
  disabled: boolean,
  width: string
}

export const CamundaNumberInput = ({camundaComponent, disabled, width}: CamundaNumberInputProps) => {
  const {key, label, description, validate, defaultValue, increment, decimalDigits, appearance} = camundaComponent;

  const createValidators = useCallback(() => {
    if (!validate) {
      return undefined;
    }
    const validators: Validator[] = [];
    if (validate.required) {
      validators.push(required());
    }

    if (validate.min) {
      validators.push(minValue(validate.min));
    }

    if (validate.max) {
      validators.push(maxValue(validate.max));
    }

    return validators;
  }, [validate]);
  const validators = createValidators();
  const helperText = description || false;
  return (
    <>
      <NumberInput source={key} sx={{width: width}} helperText={helperText}
                   format={formatNumber} parse={value => parseNumber(value, decimalDigits)}
                   InputProps={appearance ? {
                     startAdornment: <InputAdornment position="start">
                       {appearance.prefixAdorner}
                     </InputAdornment>, endAdornment: <InputAdornment position="end">
                       {appearance.suffixAdorner} </InputAdornment>
                   } : undefined}
                   label={label} translate="no" validate={validators}
                   defaultValue={defaultValue} disabled={disabled}
                   step={increment}
      />
    </>
  );
};