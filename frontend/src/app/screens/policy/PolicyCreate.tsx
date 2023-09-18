import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {useCallback} from "react";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {BIG_DECIMAL_FRACTION_DIGITS} from "../../../core/format/constants";
import {formatNumber} from "../../../core/format/formatNumber";
import {parseNumber} from "../../../core/format/parseNumber";
import {
  getPolicyholderDtoRecordRepresentation
} from "../../../core/record-representation/getPolicyholderDtoRecordRepresentation";
import {
  getPolicyTypeDtoRecordRepresentation
} from "../../../core/record-representation/getPolicyTypeDtoRecordRepresentation";

const UPDATE_POLICY = gql(`mutation UpdatePolicy($input: PolicyInputDto!) {
  updatePolicy(input: $input) {
    caseDescription
    id
    insurancePremium
    insuranceSum
    name
    policyType {
      description
      id
      name
    }
    policyholder {
      address
      dateOfBirth
      id
      name
    }
  }
}`);

const POLICY_TYPE_LIST_POLICY_CREATE = gql(`
query PolicyTypeList_PolicyCreate {
    policyTypeList {
        description
        id
        name
    }
}
`);

const POLICYHOLDER_LIST_POLICY_CREATE = gql(`
query PolicyholderList_PolicyCreate {
    policyholderList {
        address
        dateOfBirth
        id
        name
    }
}
`);

export const PolicyCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = {data, meta: {mutation: UPDATE_POLICY}};
        const options = {returnPromise: true};

        await create("PolicyOutputDto", params, options);

        notify("ra.notification.created", {messageArgs: {smart_count: 1}});
        redirect("list", "PolicyOutputDto");
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
        <TextInput source="name" name="name" required={true}/>
        <TextInput source="caseDescription" name="caseDescription"/>
        <NumberInput
          source="insuranceSum"
          name="insuranceSum"
          format={formatNumber}
          parse={(value) => {
            return parseNumber(value, BIG_DECIMAL_FRACTION_DIGITS);
          }}
          required={true}
        />
        <NumberInput
          source="insurancePremium"
          name="insurancePremium"
          format={formatNumber}
          parse={(value) => {
            return parseNumber(value, BIG_DECIMAL_FRACTION_DIGITS);
          }}
          required={true}
        />
        <ReferenceInput source="policyType.id" name="policyType" reference="PolicyTypeDto"
                        queryOptions={{
                          meta: {
                            query: POLICY_TYPE_LIST_POLICY_CREATE
                          }
                        }}>
          <AutocompleteInput optionText={getPolicyTypeDtoRecordRepresentation}/>
        </ReferenceInput>
        <ReferenceInput source="policyholder.id" name="policyholder" reference="PolicyholderDto"
                        queryOptions={{
                          meta: {
                            query: POLICYHOLDER_LIST_POLICY_CREATE
                          }
                        }}>
          <AutocompleteInput optionText={getPolicyholderDtoRecordRepresentation}/>
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

const POLICY_TYPE = gql(`query Policy($id: ID!) {
  policy(id: $id) {
    caseDescription
    id
    insurancePremium
    insuranceSum
    name
    policyType {
      description
      id
      name
    }
    policyholder {
      address
      dateOfBirth
      id
      name
    }
  }
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof POLICY_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["policy"], undefined>;
