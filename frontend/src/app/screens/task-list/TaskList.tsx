import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, EditButton, List, TextField } from "react-admin";

const CAMUNDA_TASK_LIST = gql(`query CamundaTaskList_CamundaTaskList(
  $sort: [CamundaTaskOrderByInput]
  $page: OffsetPageInput
) {
  camundaTaskList(
    sort: $sort
    page: $page
  ) {
    content {
      id
      assignee
      creationDate
      name
      processName
    }
    totalElements
  }
}`);

export const TaskList = () => {
  const queryOptions = {
    meta: {
      query: CAMUNDA_TASK_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" sortable={false} />
        <TextField source="processName" sortable={false} />
        <TextField source="creationDate" />
        <TextField source="assignee" sortable={false} />

        <EditButton label={"Open"}/>
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CAMUNDA_TASK_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["camundaTaskList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
