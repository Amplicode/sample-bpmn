import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import { useMemo, useState } from "react";
import {
  Datagrid,
  List,
  TextField,
  TextInput,
  FunctionField,
  Form,
  useTranslate,
  CreateBase,
  useNotify,
  useRecordContext
} from "react-admin";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { useMutation } from "react-query";
import { useApolloClient } from "@apollo/client";
import { Link, LinkBaseProps } from "@mui/material";

const CAMUNDA_PROCESS_DEFINITION_LIST =
  gql(`query CamundaProcessDefinitionList($page: OffsetPageInput, $filter: CamundaProcessDefinitionFilterInput) {
    camundaProcessDefinitionList(page: $page, filter: $filter) {
      content {
        key
        name
        bpmnProcessId
        resource
      }
      totalElements
    }
  }`);

export interface ResourceFileFieldProps extends LinkBaseProps {}

export const ResourceFileField = (props: ResourceFileFieldProps) => {
  const record = useRecordContext();
  const translate = useTranslate();

  const fileHref = useMemo(() => {
    const resourceBlob = new Blob([record.resource], {type: 'text/xml'});
      return window.URL.createObjectURL(resourceBlob);
  }, [record.resource]);

  return (
    <Link style={{ cursor: "pointer" }} target="_blank" href={fileHref} {...props}>
    {/* <Link style={{ cursor: "pointer" }} download href={fileHref} {...props}> */}
      {translate("ra.action.open")}
    </Link>
  );
};


const START_CAMUNDA_PROCESS = gql(`
mutation StartCamundaProcess($bpmnProcessId: String!, $variables: String) {
  startCamundaProcess(bpmnProcessId: $bpmnProcessId, variables: $variables)
}
`);

interface StartProcessDialogProps {
  open: boolean;
  onClose: () => void;
  bpmnProcessId: string;
}

const StartProcessDialog = ({
  onClose,
  open,
  bpmnProcessId,
}: StartProcessDialogProps) => {
  const apolloClient = useApolloClient();
  const { mutate } = useMutation(
    (variables: { bpmnProcessId: string; variables?: string }) =>
      apolloClient.mutate({ mutation: START_CAMUNDA_PROCESS, variables })
  );

  const translate = useTranslate();
  const notify = useNotify();

  const onStart = (data) => {
    mutate(
      {
        variables: data.variables,
        bpmnProcessId,
      },
      {
        onSuccess: () => {
          notify("success", {
            type: "success",
          });
          onClose();
        },
        onError: () => {
          notify("error", {
            type: "error",
          });
        },
      }
    );
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle>{translate("camunda.startProcess.startProcessLabel")}</DialogTitle>
      <DialogContent>
        <CreateBase>
          <Form onSubmit={onStart} id="start_process_form">
            <TextInput
              label={"camunda.startProcess.startProcessVariableJson"}
              source="variables"
              multiline
              fullWidth
              minRows={4}
            />
          </Form>
        </CreateBase>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{translate("ra.action.close")}</Button>
        <Button form="start_process_form" type="submit">
          {translate("camunda.startProcess.startProcessButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const CamundaProcessDefinitionList = (
  props: Omit<ListProps, "children">
) => {
  const queryOptions = {
    meta: {
      query: CAMUNDA_PROCESS_DEFINITION_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };
  const filters = [
    <TextInput source="name" alwaysOn />,
    <TextInput source="bpmnProcessId" alwaysOn />,
  ];

  const translate = useTranslate();

  const [openStartProcessDialog, setOpenStartProcessDialog] = useState(false);

  const handleOpenStartProcessDialog = () => {
    setOpenStartProcessDialog(true);
  };

  const handleCloseStartProcessDialog = () => {
    setOpenStartProcessDialog(false);
  };

  return (
    <List<ItemType>
      queryOptions={queryOptions}
      exporter={false}
      filters={filters}
      {...props}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="key" sortable={false} />
        <TextField source="name" sortable={false} />
        <TextField source="bpmnProcessId" sortable={false} />
        <FunctionField
          source="resource"
          render={() => <ResourceFileField />}
          sortable={false}
        />
        <FunctionField
          label="camunda.startProcess.startProcessLabel"
          render={(record) => (
            <>
              <Button variant="outlined" onClick={handleOpenStartProcessDialog}>
                {translate("camunda.startProcess.startProcessButton")}
              </Button>
              <StartProcessDialog
                bpmnProcessId={record.bpmnProcessId}
                open={openStartProcessDialog}
                onClose={handleCloseStartProcessDialog}
              />
            </>
          )}
          sortable={false}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CAMUNDA_PROCESS_DEFINITION_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["camundaProcessDefinitionList"]["content"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>[0],
  undefined
>;
