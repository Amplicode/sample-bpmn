import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  AutocompleteInput,
  DateTimeInput,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";
import { parseOffsetDateTime } from "../../../core/format/parseOffsetDateTime";
import { getPolicyOutputDtoRecordRepresentation } from "../../../core/record-representation/getPolicyOutputDtoRecordRepresentation";

const CLAIM = gql(`query Claim($id: ID!) {
  claim(id: $id) {
    description
    id
    policy {
      caseDescription
      id
      insurancePremium
      insuranceSum
      name
    }
    timestamp
  }
}`);
const UPDATE_CLAIM = gql(`mutation UpdateClaim($input: ClaimInputDto!) {
  updateClaim(input: $input) {
    description
    id
    policy {
      caseDescription
      id
      insurancePremium
      insuranceSum
      name
    }
    timestamp
  }
}`);

const POLICY_LIST_CLAIM_EDIT = gql(`
query PolicyList_ClaimCreate {
    policyList {
        caseDescription
        id
        insurancePremium
        insuranceSum
        name
    }
}
`);

export const ClaimEdit = () => {
  const queryOptions = {
    meta: {
      query: CLAIM,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_CLAIM } };
        const options = { returnPromise: true };

        await update("ClaimOutputDto", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "ClaimOutputDto");
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
        <TextInput source="description" name="description" />
        <ReferenceInput source="policy.id" name="policy" reference="PolicyOutputDto"
                        queryOptions={{
                          meta: {
                            query: POLICY_LIST_CLAIM_EDIT
                          }
                        }}>
          <AutocompleteInput optionText={getPolicyOutputDtoRecordRepresentation}/>
        </ReferenceInput>
        <DateTimeInput source="timestamp" name="timestamp" parse={parseOffsetDateTime} />
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CLAIM>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["claim"], undefined>;
