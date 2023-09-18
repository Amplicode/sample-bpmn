import { gql } from "@amplicode/gql";
import { PolicyholderDto } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, DeleteButton, EditButton, FunctionField, List, TextField } from "react-admin";
import { renderDate } from "../../../core/format/renderDate";

const POLICYHOLDER_LIST = gql(`query PolicyholderList {
  policyholderList {
    address
    dateOfBirth
    id
    name
  }
}`);

const DELETE_POLICYHOLDER = gql(`mutation DeletePolicyholder($id: ID!) {
  deletePolicyholder(id: $id) 
}`);

export const PolicyholderList = () => {
  const queryOptions = {
    meta: {
      query: POLICYHOLDER_LIST,
      resultDataPath: "",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} pagination={false}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />
        <TextField source="name" sortable={false} />
        <FunctionField
          source="dateOfBirth"
          render={(record: PolicyholderDto) => renderDate(record.dateOfBirth)}
        />
        <TextField source="address" sortable={false} />
        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_POLICYHOLDER } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof POLICYHOLDER_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["policyholderList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<Exclude<ItemListType, null | undefined>[0], undefined>;
