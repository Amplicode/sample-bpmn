import {gql} from "@amplicode/gql";
import {useCallback, useMemo} from "react";
import {Form, SaveButton, Title, useNotify, useRedirect,} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {useMutation, useQuery} from "@apollo/client";
import {useParams} from "react-router";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {createFormComponent} from "./FormSupport";

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
    skip : !taskData,
    variables: {
      processDefinitionId: taskData?.camundaTask?.processDefinitionKey,
      formId: taskData?.camundaTask?.formKey
    }
  });

  const camundaForm = useMemo(
    () => camundaFormData?.camundaForm,
    [camundaFormData?.camundaForm]
  )

  const [runCompleteCamundaTask] = useMutation(COMPLETE_CAMUNDA_TASK_TASK_FORM, {});

  const redirect = useRedirect();
  const notify = useNotify();

  const onFormSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const variablesStr = JSON.stringify(data)

        await runCompleteCamundaTask({
          variables: {
            id: id!!,
            variables: variablesStr
          }
        })

        notify("Task Completed", {});
        redirect("list", "CamundaTask");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [notify, redirect, runCompleteCamundaTask]
  );

  if (taskLoading) {
    return (<div>Loading...</div>)
  }

  if (camundaFormLoading) {
    return (<div>Loading...</div>)
  }

  const task = taskData?.camundaTask!!
  const form = camundaFormData?.camundaForm == null ? null : JSON.parse(camundaFormData?.camundaForm?.schema!!)
  const components = form == null ? [] : form?.components

  return (
    <>
      <Title title={"Task - " + task.name}/>
      <Typography variant="h6" gutterBottom component="h2">
        {"Assignee - " + task.assignee}
      </Typography>
      <Typography variant="h6" gutterBottom component="h2">
      </Typography>
      <Form onSubmit={onFormSubmit}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              {components.map(component =>
                <Grid item xs={12}>
                  {createFormComponent(component)}
                </Grid>)
              }
              <Grid item xs={6} md={4}>
                <SaveButton label="Complete" alwaysEnable={true}/>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Form>
    </>
  );
};

