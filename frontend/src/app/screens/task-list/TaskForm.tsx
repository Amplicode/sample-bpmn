import {gql} from "@amplicode/gql";
import {useCallback} from "react";
import {
  Button,
  Error,
  Form,
  FunctionField,
  Labeled,
  Loading,
  SaveButton,
  TextField,
  Title,
  useNotify,
  useRedirect,
  useTranslate,
} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {useApolloClient, useQuery} from "@apollo/client";
import {useParams} from "react-router";
import {Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import {CamundaComponent} from "./dynamic-form/camundaFormTypes";
import {CamundaTask, CamundaTaskState} from "@amplicode/gql/graphql";
import {CamundaFormComponent} from "./dynamic-form/CamundaFormComponent";
import CancelIcon from "@mui/icons-material/Cancel";
import {EnumField} from "../../../core/components/enum/EnumField";
import {OffsetDateTimeField} from "../../../core/components/datetime/OffsetDateTimeField";

const CAMUNDA_TASK_TASK_TASK_FORM = gql(`query Task($id: String!) {
  camundaTask(id: $id) {
    id
    assignee
    creationDate
    dueDate
    followUpDate
    formKey
    name
    processDefinitionKey
    processInstanceKey
    processName
    taskState
  }
}`);

const COMPLETE_CAMUNDA_TASK_TASK_FORM = gql(`
mutation CompleteCamundaTask_TaskForm(
    $id: String!,
    $variables: String
) {
    completeCamundaTask(
        taskId: $id,
        variables: $variables)               
}
`);

const CAMUNDA_FORM_TASK_FORM = gql(`
query CamundaForm_TaskForm(
    $processDefinitionId: String,
    $formId: String
) {
    camundaForm(
        formId: $formId,
        processDefinitionId: $processDefinitionId
) {
        id
        processDefinitionId
        schema
    }
}
`);

const CAMUNDA_VARIABLES = gql(`
query camundaVariables(
    $taskId: String
) {
    camundaVariables(
        taskId: $taskId) 
}
`);

export const TaskForm = () => {
  const {id} = useParams();

  const {loading: taskLoading, error: taskError, data: taskData} = useQuery(CAMUNDA_TASK_TASK_TASK_FORM, {
    variables: {
      id: id!!
    }
  });

  const {
    loading: camundaFormLoading,
    error: camundaFormError,
    data: camundaFormData
  } = useQuery(CAMUNDA_FORM_TASK_FORM, {
    skip: !taskData,
    variables: {
      processDefinitionId: taskData?.camundaTask?.processDefinitionKey,
      formId: taskData?.camundaTask?.formKey
    }
  });

  const {
    loading: camundaVariablesLoading,
    data: camundaVariablesData
  } = useQuery(CAMUNDA_VARIABLES, {
    skip: !taskData,
    variables: {
      taskId: taskData?.camundaTask?.id
    }
  });

  const apolloClient = useApolloClient();

  const redirect = useRedirect();
  const notify = useNotify();
  const translate = useTranslate();

  const handleSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const variablesStr = JSON.stringify(data);

        await apolloClient.mutate({
          mutation: COMPLETE_CAMUNDA_TASK_TASK_FORM,
          variables: {
            id: id!!,
            variables: variablesStr
          }
        });

        notify("Task Completed", {});
        redirect("list", "CamundaTask");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [notify, redirect, apolloClient, id]
  );
  const onClose = useCallback(() => {
    redirect("list", "CamundaTask");
  }, [redirect]);


  if (taskLoading || camundaFormLoading || camundaVariablesLoading) {
    return <Loading/>
  }

  if (taskError || camundaFormError) {
    const error = taskError ? taskError!! : camundaFormError!!;
    return <Error error={error} resetErrorBoundary={() => {
    }}/>
  }

  const task = taskData?.camundaTask!!;
  const formJson = camundaFormData?.camundaForm ? JSON.parse(camundaFormData?.camundaForm?.schema!!) : null;
  const components = formJson ? formJson.components : [];
  const defaultFormValues = camundaVariablesData?.camundaVariables ? JSON.parse(camundaVariablesData?.camundaVariables) : {};
  const readonly = task.taskState === CamundaTaskState.Completed;

  return (
    <>
      <Title title={translate("camunda.taskForm.title", {
        taskName: task.name
      })}/>
      <Grid container={true} spacing={1} paddingTop={"1em"}>
        <Grid item={true} xs={12} sm={12} md={7} lg={7} xl={7}>
          <Form onSubmit={handleSubmit} defaultValues={defaultFormValues}>
            <Card variant="outlined" sx={{marginTop: "0.5em"}}>
              <CardContent>
                <Grid container spacing={2}>
                  {components.map((component, index) => <Grid container={component.type === CamundaComponent.Group} item
                                                              xs={12} key={index}>
                      <CamundaFormComponent camundaComponent={component} readonly={readonly}/>
                    </Grid>
                  )
                  }
                  <Grid item xs={12} md={12}>
                    <div style={{display: "flex"}}>
                      {!readonly && <SaveButton label="camunda.taskForm.complete.button" alwaysEnable={true}/>}
                      <Button size="medium" label="ra.action.close"
                              sx={{marginLeft: "auto"}}
                              startIcon={<CancelIcon/>}
                              onClick={onClose}/>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Form>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={5} lg={5} xl={5}>
          <TaskDetails task={task}/>
        </Grid>
      </Grid>
    </>
  );
}

interface TaskDetailsProps {
  task: CamundaTask
}

export const TaskDetails = ({task}: TaskDetailsProps) => {
  const translate = useTranslate();
  return (
    <>
      <Stack>
        <Typography variant="h6" marginBottom="0.5em">{translate("camunda.taskForm.taskDetails")}</Typography>
        <Labeled>
          <TextField source="name" record={task} resource="CamundaTask"/>
        </Labeled>
        <Labeled>
          <TextField source="assignee" record={task} resource="CamundaTask"/>
        </Labeled>
        <Labeled label="camunda.taskForm.process">
          <FunctionField record={task}
                         render={(record) => <span>{record.processName} ({record.processInstanceKey})</span>}/>
        </Labeled>
        <Labeled>
          <EnumField source="taskState" record={task} enum={CamundaTaskState} enumTypeName="CamundaTaskState"
                     resource="CamundaTask"/>
        </Labeled>
        <Labeled>
          <OffsetDateTimeField source="creationDate" record={task} resource="CamundaTask"/>
        </Labeled>
        <Labeled>
          <OffsetDateTimeField source="dueDate" record={task} resource="CamundaTask"/>
        </Labeled>
        <Labeled>
          <OffsetDateTimeField source="followUpDate" record={task} resource="CamundaTask"/>
        </Labeled>
      </Stack>
    </>
  );
};

