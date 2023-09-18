import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {useCallback, useMemo} from "react";
import {
  AutocompleteInput,
  Create,
  DateTimeInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {parseOffsetDateTime} from "../../../core/format/parseOffsetDateTime";
import {
  getPolicyOutputDtoRecordRepresentation
} from "../../../core/record-representation/getPolicyOutputDtoRecordRepresentation";

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

const POLICY_LIST_CLAIM_CREATE = gql(`
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

export const ClaimCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_CLAIM } };
        const options = { returnPromise: true };

        await create("ClaimOutputDto", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "ClaimOutputDto");
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
        <TextInput source="description" name="description" />
        <ReferenceInput source="policy.id" name="policy" reference="PolicyOutputDto"
                        queryOptions={{
                          meta: {
                            query: POLICY_LIST_CLAIM_CREATE
                          }
                        }}>
          <AutocompleteInput optionText={getPolicyOutputDtoRecordRepresentation} />
        </ReferenceInput>
        <DateTimeInput source="timestamp" name="timestamp" parse={parseOffsetDateTime} />
      </SimpleForm>
    </Create>
  );
};

const CLAIM_TYPE = gql(`query Claim($id: ID!) {
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

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CLAIM_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["claim"], undefined>;
