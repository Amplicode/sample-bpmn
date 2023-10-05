import {gql} from "@amplicode/gql";
import {PolicyOutputDto} from "@amplicode/gql/graphql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  NumberField,
  TextField, useNotify,
  useRecordContext,
} from "react-admin";
import {
  getPolicyholderDtoRecordRepresentation
} from "../../../core/record-representation/getPolicyholderDtoRecordRepresentation";
import {
  getPolicyTypeDtoRecordRepresentation
} from "../../../core/record-representation/getPolicyTypeDtoRecordRepresentation";
import {Button} from "@mui/material";
import {useMutation} from "@apollo/client";

const POLICY_LIST = gql(`query PolicyList {
  policyList {
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

const DELETE_POLICY = gql(`mutation DeletePolicy($id: ID!) {
  deletePolicy(id: $id) 
}`);

export const PolicyList = () => {
  const queryOptions = {
    meta: {
      query: POLICY_LIST,
      resultDataPath: "",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} pagination={false}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false}/>
        <TextField source="name" sortable={false}/>
        <TextField source="caseDescription" sortable={false}/>
        <NumberField source="insuranceSum" sortable={false}/>
        <NumberField source="insurancePremium" sortable={false}/>
        <FunctionField
          source="policyType.id"
          render={(record: PolicyOutputDto) =>
            getPolicyTypeDtoRecordRepresentation(record.policyType)
          }
          sortable={false}
        />
        <FunctionField
          source="policyholder.id"
          render={(record: PolicyOutputDto) =>
            getPolicyholderDtoRecordRepresentation(record.policyholder)
          }
          sortable={false}
        />
        <StartProcessButton/>
        <EditButton/>
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{meta: {mutation: DELETE_POLICY}}}
        />
      </Datagrid>
    </List>
  );
};

const RUN_CLAIM_PROCESS_START_PROCESS_BUTTON = gql(`
mutation RunClaimProcess_StartProcessButton($policyId: Long!) {
    runClaimProcess(policyId: $policyId)
}
`);

export const StartProcessButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const [runRunClaimProcess] = useMutation(RUN_CLAIM_PROCESS_START_PROCESS_BUTTON, {});
  return (
    <>
      <Button onClick={e => {
        e.stopPropagation()
        runRunClaimProcess({
          variables: {
            policyId: record.id
          }
        }).then(() => notify("Claim process started"))
      }}>
        Run Claim Process
      </Button>
    </>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof POLICY_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["policyList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<Exclude<ItemListType, null | undefined>[0], undefined>;
