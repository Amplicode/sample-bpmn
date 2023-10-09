import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, EditButton, List, TextField } from "react-admin";

const ASSIGNED_TASK_LIST = gql(`query AssignedTaskList_AssignedTaskList(
  $sort: [CamundaTaskOrderByInput]
  $page: OffsetPageInput
) {
  assignedTaskList(
    sort: $sort
    page: $page
  ) {
    content {
      assignee
      creationDate
      id
      name
      processName
    }
    totalElements
  }
}`);

export const TaskList = () => {
  const queryOptions = {
    meta: {
      query: ASSIGNED_TASK_LIST,
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
type QueryResultType = ResultOf<typeof ASSIGNED_TASK_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["assignedTaskList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
