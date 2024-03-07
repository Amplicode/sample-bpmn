import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import {
  Datagrid,
  List,
  TextField,
  DeleteButton,
  EditButton,
  FunctionField,
  useTranslate, BooleanField,
} from "react-admin";

const CAMUNDA_TASK_FILTER_LIST =
  gql(`query CamundaTaskFilterList($page: OffsetPageInput) {
    camundaTaskFilterList(page: $page) {
      content {
        id
        name
        isDefault
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

const DELETE_CAMUNDA_TASK_FILTER = gql(`
mutation DeleteCamundaTaskFilter($id: ID!) {
  deleteCamundaTaskFilter(id: $id)
}
`);

export const CamundaTaskFilterList = (props: Omit<ListProps, "children">) => {
  const translate = useTranslate();
  const queryOptions = {
    meta: {
      query: CAMUNDA_TASK_FILTER_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} {...props}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" sortable={false} />
        <BooleanField source="isDefault" sortable={false}/>
        <FunctionField
          source="conditions"
          sortable={false}
          render={(values) => (
            <>
              {values.conditions
                .map((condition) =>
                  translate(`enums.CamundaTaskConditionType.${condition.type}`)
                )
                .join(", ")}
            </>
          )}
        />
        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_CAMUNDA_TASK_FILTER } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CAMUNDA_TASK_FILTER_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["camundaTaskFilterList"]["content"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>[0],
  undefined
>;
