import {
  SelectInput,
  TextInput,
  required,
  useSimpleFormIteratorItem,
  InputProps,
  useInput,
  useTranslate,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { CamundaTaskConditionType } from "@amplicode/gql/graphql";
import { Autocomplete, TextField } from "@mui/material";
import { camundaTaskConditionTypeMapping } from "./camundaTaskConditionTypeMapping";
import { evaluate } from "feelin";

const minWidthStyle = { minWidth: 400 };

interface ValuesInputProps extends InputProps {}
const ValuesInput = ({ ...props }: ValuesInputProps) => {
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
  } = useInput({
    ...props,
  });
  const translate = useTranslate();

  const translatedLabel =
    typeof props.label === "string"
      ? translate(props.label)
      : translate("camunda.taskFilter.condition.values");
  const label = props.isRequired ? translatedLabel + " *" : translatedLabel;

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      value={field.value}
      onChange={(event, newValue) => {
        field.onChange(newValue);
      }}
      defaultValue={[]}
      freeSolo
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          style={minWidthStyle}
          label={label}
          helperText={
            (isTouched || isSubmitted) && invalid ? error?.message : undefined
          }
          error={(isTouched || isSubmitted) && invalid}
        />
      )}
    />
  );
};

export const ConditionInputs = () => {
  const { setValue, watch } = useFormContext();
  const { index } = useSimpleFormIteratorItem();
  const type = watch(`conditions.${index}.type`);
  const translate = useTranslate();

  const taskConditionTypeChoices = Object.values(CamundaTaskConditionType).map(
    (taskFilter) => ({
      id: taskFilter,
      name: translate(`enums.CamundaTaskConditionType.${taskFilter}`),
    })
  );

  return (
    <>
      <SelectInput
        source={`conditions.${index}.type`}
        label="camunda.taskFilter.condition.type"
        choices={taskConditionTypeChoices}
        validate={required()}
        style={minWidthStyle}
        onChange={() => {
          setValue(`conditions.${index}.values`, []);
          setValue(`conditions.${index}.valueExpression`, undefined);
        }}
      />
      {camundaTaskConditionTypeMapping[type]?.values === "multiselect" && (
        <ValuesInput source={`conditions.${index}.values`} />
      )}
      {camundaTaskConditionTypeMapping[type]?.values ===
        "taskState" && (
        <SelectInput
          label="camunda.taskFilter.condition.values"
          style={minWidthStyle}
          validate={required()}
          source={`conditions.${index}.values`}
          choices={[
            { id: "CREATED", name: translate("enums.CamundaTaskState.CREATED") },
            { id: "COMPLETED", name: translate("enums.CamundaTaskState.COMPLETED") },
            { id: "CANCELED", name: translate("enums.CamundaTaskState.CANCELED") },
          ]}
        />
      )}
      {camundaTaskConditionTypeMapping[type]?.valueExpression && (
        <TextInput
          label="camunda.taskFilter.condition.valueExpression"
          multiline
          minRows={4}
          style={minWidthStyle}
          source={`conditions.${index}.valueExpression`}
          validate={(value) => {
            try {
              evaluate(value);
            } catch (error) {
              return translate(
                "camunda.taskFilter.condition.valueExpressionValidationError"
              );
            }
            return undefined;
          }}
        />
      )}
    </>
  );
};
