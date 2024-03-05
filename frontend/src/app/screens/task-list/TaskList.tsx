import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {Button, Datagrid, EditButton, FunctionField, Link, List, TextField} from "react-admin";
import {OffsetDateTimeField} from "../../../core/components/datetime/OffsetDateTimeField";
import {EnumField} from "../../../core/components/enum/EnumField";
import {CamundaTaskState} from "@amplicode/gql/graphql";
import EditIcon from '@mui/icons-material/Edit';

const CAMUNDA_TASK_LIST = gql(`query CamundaTaskList_CamundaTaskList(
    $sort: [CamundaTaskOrderByInput],
    $page: OffsetPageInput
) {
    camundaTaskList(
        page: $page,
        sort: $sort
) {
        content {
            assignee
            creationDate
            dueDate
            followUpDate
            id
            name
            processName
            processInstanceKey
            taskState
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
        <TextField source="name"/>
        <TextField source="processName"/>
        <TextField source="processInstanceKey"/>
        <OffsetDateTimeField source="creationDate"/>
        <TextField source="assignee"/>
        <EnumField source="taskState" enum={CamundaTaskState} enumTypeName="CamundaTaskState"/>
        <OffsetDateTimeField source="dueDate"/>

        <FunctionField render={() => <EditButton label="camunda.taskList.open"/>}/>
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
