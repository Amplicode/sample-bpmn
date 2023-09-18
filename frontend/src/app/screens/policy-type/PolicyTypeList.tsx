import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, DeleteButton, EditButton, List, TextField } from "react-admin";

const POLICY_TYPE_LIST = gql(`query PolicyTypeList {
  policyTypeList {
    description
    id
    name
  }
}`);

const DELETE_POLICY_TYPE = gql(`mutation DeletePolicyType($id: ID!) {
  deletePolicyType(id: $id) 
}`);

export const PolicyTypeList = () => {
  const queryOptions = {
    meta: {
      query: POLICY_TYPE_LIST,
      resultDataPath: "",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} pagination={false}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" sortable={false} />
        <TextField source="description" sortable={false} />

        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_POLICY_TYPE } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof POLICY_TYPE_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["policyTypeList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<Exclude<ItemListType, null | undefined>[0], undefined>;
