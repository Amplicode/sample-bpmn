import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Button } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  required,
  useUpdate,
  useNotify,
  useRedirect,
  Edit,
  ArrayInput,
  useTranslate,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";
import { ConditionInputs } from "./ConditionInputs";

const CAMUNDA_TASK_FILTER = gql(`query CamundaTaskFilter($id: ID!) {
  camundaTaskFilter(id: $id) {
    id
    name
    conditions {
      id
      type
      values
      valueExpression
    }
  }
}`);
const UPDATE_TASK_FILTER =
  gql(`mutation UpdateTaskFilter($input: CamundaTaskFilterInput!) {
  updateTaskFilter(input: $input) {
    id
    name
    conditions {
      id
      type
      values
      valueExpression
    }
  }
}`);

const minWidthStyle = { minWidth: 400 };

export const CamundaTaskFilterEdit = () => {
  const queryOptions = {
    meta: {
      query: CAMUNDA_TASK_FILTER,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();
  const translate = useTranslate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_TASK_FILTER } };
        const options = { returnPromise: true };

        await update("CamundaTaskFilter", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "CamundaTaskFilter");
      } catch (response: any) {
        console.log("create failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <TextInput source="name" style={minWidthStyle} validate={required()} />
        <ArrayInput source="conditions">
          <SimpleFormIterator
            fullWidth
            addButton={
              <Button startIcon={<AddCircleOutline />}>
                {translate("camunda.taskFilter.condition.addCondition")}
              </Button>
            }
            removeButton={
              <Button startIcon={<RemoveCircleOutline />}>
                {translate("camunda.taskFilter.condition.removeCondition")}
              </Button>
            }
            disableClear
          >
            <ConditionInputs />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof UPDATE_TASK_FILTER>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<
  QueryResultType["updateTaskFilter"],
  undefined
>;
