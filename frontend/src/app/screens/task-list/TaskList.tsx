import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  ListProps,
  SelectInput,
  TextField,
} from "react-admin";
import { OffsetDateTimeField } from "../../../core/components/datetime/OffsetDateTimeField";
import { EnumField } from "../../../core/components/enum/EnumField";
import { CamundaTaskState } from "@amplicode/gql/graphql";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";

const CAMUNDA_TASK_FILTER_LIST =
  gql(`query CamundaTaskFilterList($page: OffsetPageInput) {
    camundaTaskFilterList(page: $page) {
      content {
        id
        name
        conditions {
          id
          type
          values
          valueExpression
        }
      }
      totalElements
    }
  }`);

const CAMUNDA_TASK_LIST = gql(`query CamundaTaskList_CamundaTaskList(
    $sort: [CamundaTaskOrderByInput],
    $page: OffsetPageInput,
    $filter: CamundaTaskListFilterInput,
) {
    camundaTaskList(
        page: $page,
        sort: $sort,
        filter: $filter
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

export const TaskList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: CAMUNDA_TASK_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const { data } = useQuery(CAMUNDA_TASK_FILTER_LIST, {
    variables: {
      page: {
        size: 1000,
        number: 0,
      },
    },
  });

  const choices = useMemo(() => {
    return data?.camundaTaskFilterList.content?.map((taskFilter) => ({
      id: taskFilter?.id,
      name: taskFilter?.name,
    }));
  }, [data]);

  const filters = choices
    ? [<SelectInput source="filterId" alwaysOn choices={choices} />]
    : [];

  return (
    <List<ItemType>
      queryOptions={queryOptions}
      exporter={false}
      filters={filters}
      {...props}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="processName" />
        <TextField source="processInstanceKey" />
        <OffsetDateTimeField source="creationDate" />
        <TextField source="assignee" />
        <EnumField
          source="taskState"
          enum={CamundaTaskState}
          enumTypeName="CamundaTaskState"
        />
        <OffsetDateTimeField source="dueDate" />

        <FunctionField
          render={() => <EditButton label="camunda.taskList.open" />}
        />
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
