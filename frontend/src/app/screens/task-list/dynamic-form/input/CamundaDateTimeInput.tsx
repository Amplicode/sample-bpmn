import {required} from "react-admin";
import {CamundaDateTimeType, DateTimeModel} from "../camundaFormTypes";
import {DateInput} from "../../../../../core/components/datetime/DateInput";
import {OffsetDateTimeInput} from "../../../../../core/components/datetime/OffsetDateTimeInput";
import {OffsetTimeInput} from "../../../../../core/components/datetime/OffsetTimeInput";

interface TaskFormDateTimeInputProps {
  camundaComponent: DateTimeModel,
  disabled: boolean,
  width: string
}

export const CamundaDateTimeInput = ({camundaComponent, disabled, width}: TaskFormDateTimeInputProps) => {
  const {
    key,
    dateLabel,
    timeLabel,
    timeInterval,
    description,
    disallowPassedDates,
    subtype,
    validate,
    use24h,
  } = camundaComponent;

  const validators = validate && validate.required ? [required()] : undefined;
  const helperText = description || false;
  const label = (dateLabel || "") + " " + (timeLabel || "");
  return (
    <>
      {subtype === CamundaDateTimeType.Date &&
        <DateInput source={key} sx={{width: width}}
                   disablePast={disallowPassedDates}
                   disabled={disabled}
                   helperText={helperText}
                   label={dateLabel}
                   validate={validators}/>}

      {subtype === CamundaDateTimeType.Time &&
        <OffsetTimeInput source={key} sx={{width: width}}
                         minutesStep={timeInterval}
                         disabled={disabled}
                         ampm={!use24h}
                         ampmInClock={!use24h}
                         helperText={helperText}
                         label={timeLabel}
                         validate={validators}/>}

      {subtype === CamundaDateTimeType.DateTime  &&
        <OffsetDateTimeInput source={key} sx={{width: width}}
                             disablePast={disallowPassedDates}
                             minutesStep={timeInterval}
                             ampm={!use24h}
                             ampmInClock={!use24h}
                             disabled={disabled}
                             helperText={helperText}
                             label={label}
                             validate={validators}/>}
    </>
  );
};