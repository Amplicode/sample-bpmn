import {gql} from "@amplicode/gql";
import {useCallback} from "react";
import {Form, SaveButton, Title, useNotify, useRedirect,} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {useMutation, useQuery} from "@apollo/client";
import {useParams} from "react-router";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {createFormComponent} from "./FormSupport";

const TASK_TASK_FORM = gql(`query Task($id: String!) {
  task(id: $id) {
    assignee
    completionDate
    creationDate
    dueDate
    followUpDate
    form {
      id
      schema
    }
    formKey
    id
    name
    processDefinitionKey
    processInstanceKey
    processName
    taskState
  }
}`);

const COMPLETE_TASK_TASK_FORM = gql(`
mutation CompleteTask_TaskForm(
    $id: String!,
    $variables: String
) {
    completeTask(
        id: $id,
        variables: $variables)               
}
`);



export const TaskForm = () => {
    const {id} = useParams();

    const {loading: taskLoading, error: taskError, data: taskData} = useQuery(TASK_TASK_FORM, {
        variables: {
            id: id!!
        }
    });
    const [runCompleteTask] = useMutation(COMPLETE_TASK_TASK_FORM, {});

    const redirect = useRedirect();
    const notify = useNotify();

    const onFormSubmit: SubmitHandler<FieldValues> = useCallback(
        async (data: FieldValues) => {
            try {
                const variablesStr = JSON.stringify(data)

                await runCompleteTask({
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
        [notify, redirect, runCompleteTask]
    );

    if (taskLoading) {
        return (<div>Loading...</div>)
    }

    const task = taskData?.task!!
    const form = task.form == null ? null : JSON.parse(task.form?.schema!!)
    const components = form == null? [] : form?.components

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

