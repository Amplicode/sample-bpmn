import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Edit, SimpleForm, TextInput, useNotify, useRedirect, useUpdate } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const POLICY_TYPE = gql(`query PolicyType($id: ID!) {
  policyType(id: $id) {
    description
    id
    name
  }
}`);
const UPDATE_POLICY_TYPE = gql(`mutation UpdatePolicyType($input: PolicyTypeDtoInput!) {
  updatePolicyType(input: $input) {
    description
    id
    name
  }
}`);

export const PolicyTypeEdit = () => {
  const queryOptions = {
    meta: {
      query: POLICY_TYPE,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_POLICY_TYPE } };
        const options = { returnPromise: true };

        await update("PolicyTypeDto", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "PolicyTypeDto");
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
        <TextInput source="description" name="description" />
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof POLICY_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["policyType"], undefined>;
