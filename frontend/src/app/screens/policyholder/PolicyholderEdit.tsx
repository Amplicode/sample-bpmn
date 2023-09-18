import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const POLICYHOLDER = gql(`query Policyholder($id: ID!) {
  policyholder(id: $id) {
    address
    dateOfBirth
    id
    name
  }
}`);
const UPDATE_POLICYHOLDER = gql(`mutation UpdatePolicyholder($input: PolicyholderDtoInput!) {
  updatePolicyholder(input: $input) {
    address
    dateOfBirth
    id
    name
  }
}`);

export const PolicyholderEdit = () => {
  const queryOptions = {
    meta: {
      query: POLICYHOLDER,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_POLICYHOLDER } };
        const options = { returnPromise: true };

        await update("PolicyholderDto", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "PolicyholderDto");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <TextInput source="name" name="name" />
        <DateInput source="dateOfBirth" name="dateOfBirth" />
        <TextInput source="address" name="address" />
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof POLICYHOLDER>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["policyholder"], undefined>;
