import { CamundaTaskConditionType } from "@amplicode/gql/graphql";

export const camundaTaskConditionTypeMapping: Record<
  CamundaTaskConditionType,
  {
    values?: "multiselect" | "taskState";
    valueExpression?: boolean;
  }
> = {
  [CamundaTaskConditionType.ProcessDefinitionKey]: {
    values: "multiselect",
  },
  [CamundaTaskConditionType.ProcessDefinitionBpmnProcessId]: {
    values: "multiselect",
  },
  [CamundaTaskConditionType.TaskDefinitionKey]: {
    values: "multiselect",
  },
  [CamundaTaskConditionType.TaskState]: {
    values: "taskState",
  },
  [CamundaTaskConditionType.UnassignedTasks]: {},
  [CamundaTaskConditionType.TaskAssignee]: {
    valueExpression: true,
  },
  [CamundaTaskConditionType.TaskCandidateGroups]: {
    values: "multiselect",
    valueExpression: true,
  },
  [CamundaTaskConditionType.TaskCandidateUsers]: {
    valueExpression: true,
  },
  [CamundaTaskConditionType.TaskDueDateBefore]: {
    valueExpression: true,
  },
  [CamundaTaskConditionType.TaskDueDateAfter]: {
    valueExpression: true,
  },
  [CamundaTaskConditionType.TaskFollowUpDateBefore]: {
    valueExpression: true,
  },
  [CamundaTaskConditionType.TaskFollowUpDateAfter]: {
    valueExpression: true,
  },
};