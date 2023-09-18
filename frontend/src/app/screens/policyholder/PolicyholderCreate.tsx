import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const UPDATE_POLICYHOLDER = gql(`mutation UpdatePolicyholder($input: PolicyholderDtoInput!) {
  updatePolicyholder(input: $input) {
    address
    dateOfBirth
    id
    name
  }
}`);

export const PolicyholderCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_POLICYHOLDER } };
        const options = { returnPromise: true };

        await create("PolicyholderDto", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "PolicyholderDto");
      } catch (response: any) {
        console.log("create failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [create, notify, redirect]
  );

  return (
    <Create<ItemType> redirect="list">
      <SimpleForm onSubmit={save}>
        <TextInput source="name" name="name" />
        <DateInput source="dateOfBirth" name="dateOfBirth" />
        <TextInput source="address" name="address" />
      </SimpleForm>
    </Create>
  );
};

const POLICYHOLDER_TYPE = gql(`query Policyholder($id: ID!) {
  policyholder(id: $id) {
    address
    dateOfBirth
    id
    name
  }
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof POLICYHOLDER_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["policyholder"], undefined>;
