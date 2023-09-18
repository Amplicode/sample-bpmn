import { gql } from "@amplicode/gql";
import { ClaimOutputDto } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, DeleteButton, EditButton, FunctionField, List, TextField } from "react-admin";
import { renderDateTime } from "../../../core/format/renderDateTime";
import { getPolicyOutputDtoRecordRepresentation } from "../../../core/record-representation/getPolicyOutputDtoRecordRepresentation";

const CLAIM_LIST = gql(`query ClaimList {
  claimList {
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

const DELETE_CLAIM = gql(`mutation DeleteClaim($id: ID!) {
  deleteClaim(id: $id) 
}`);

export const ClaimList = () => {
  const queryOptions = {
    meta: {
      query: CLAIM_LIST,
      resultDataPath: "",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} pagination={false}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <TextField source="description" sortable={false} />
        <FunctionField
          source="policy.id"
          render={(record: ClaimOutputDto) => getPolicyOutputDtoRecordRepresentation(record.policy)}
          sortable={false}
        />
        <FunctionField
          source="timestamp"
          render={(record: ClaimOutputDto) => renderDateTime(record.timestamp)}
        />

        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_CLAIM } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CLAIM_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["claimList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<Exclude<ItemListType, null | undefined>[0], undefined>;
