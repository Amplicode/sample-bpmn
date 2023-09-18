import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Create, SimpleForm, TextInput, useCreate, useNotify, useRedirect } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const UPDATE_POLICY_TYPE = gql(`mutation UpdatePolicyType($input: PolicyTypeDtoInput!) {
  updatePolicyType(input: $input) {
    description
    id
    name
  }
}`);

export const PolicyTypeCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_POLICY_TYPE } };
        const options = { returnPromise: true };

        await create("PolicyTypeDto", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "PolicyTypeDto");
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
        <TextInput source="description" name="description" />
      </SimpleForm>
    </Create>
  );
};

const POLICY_TYPE_TYPE = gql(`query PolicyType($id: ID!) {
  policyType(id: $id) {
    description
    id
    name
  }
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof POLICY_TYPE_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["policyType"], undefined>;
