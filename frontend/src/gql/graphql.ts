/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type CamundaForm = {
  __typename?: "CamundaForm";
  id?: Maybe<Scalars["String"]>;
  processDefinitionId?: Maybe<Scalars["String"]>;
  schema?: Maybe<Scalars["String"]>;
};

export type CamundaProcessDefinition = {
  __typename?: "CamundaProcessDefinition";
  bpmnProcessId?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  key?: Maybe<Scalars["Long"]>;
  name?: Maybe<Scalars["String"]>;
  resource?: Maybe<Scalars["String"]>;
};

export type CamundaProcessDefinitionFilterInput = {
  bpmnProcessId?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type CamundaProcessDefinitionResultPage = {
  __typename?: "CamundaProcessDefinitionResultPage";
  content?: Maybe<Array<Maybe<CamundaProcessDefinition>>>;
  totalElements: Scalars["Long"];
};

export type CamundaTask = {
  __typename?: "CamundaTask";
  assignee?: Maybe<Scalars["String"]>;
  candidateGroups?: Maybe<Array<Maybe<Scalars["String"]>>>;
  candidateUsers?: Maybe<Array<Maybe<Scalars["String"]>>>;
  creationDate?: Maybe<Scalars["DateTime"]>;
  dueDate?: Maybe<Scalars["DateTime"]>;
  followUpDate?: Maybe<Scalars["DateTime"]>;
  formKey?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  processDefinitionKey?: Maybe<Scalars["String"]>;
  processInstanceKey?: Maybe<Scalars["String"]>;
  processName?: Maybe<Scalars["String"]>;
  taskDefinitionId?: Maybe<Scalars["String"]>;
  taskState?: Maybe<CamundaTaskState>;
};

export type CamundaTaskCondition = {
  __typename?: "CamundaTaskCondition";
  id?: Maybe<Scalars["ID"]>;
  type: CamundaTaskConditionType;
  valueExpression?: Maybe<Scalars["String"]>;
  values?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type CamundaTaskConditionInput = {
  id?: InputMaybe<Scalars["ID"]>;
  type: CamundaTaskConditionType;
  valueExpression?: InputMaybe<Scalars["String"]>;
  values?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export enum CamundaTaskConditionType {
  ProcessDefinitionBpmnProcessId = "PROCESS_DEFINITION_BPMN_PROCESS_ID",
  ProcessDefinitionKey = "PROCESS_DEFINITION_KEY",
  TaskAssignee = "TASK_ASSIGNEE",
  TaskCandidateGroups = "TASK_CANDIDATE_GROUPS",
  TaskCandidateUsers = "TASK_CANDIDATE_USERS",
  TaskDefinitionKey = "TASK_DEFINITION_KEY",
  TaskDueDateAfter = "TASK_DUE_DATE_AFTER",
  TaskDueDateBefore = "TASK_DUE_DATE_BEFORE",
  TaskFollowUpDateAfter = "TASK_FOLLOW_UP_DATE_AFTER",
  TaskFollowUpDateBefore = "TASK_FOLLOW_UP_DATE_BEFORE",
  TaskState = "TASK_STATE",
  UnassignedTasks = "UNASSIGNED_TASKS",
}

export type CamundaTaskFilter = {
  __typename?: "CamundaTaskFilter";
  conditions?: Maybe<Array<Maybe<CamundaTaskCondition>>>;
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type CamundaTaskFilterInput = {
  conditions?: InputMaybe<Array<InputMaybe<CamundaTaskConditionInput>>>;
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type CamundaTaskFilterResultPage = {
  __typename?: "CamundaTaskFilterResultPage";
  content?: Maybe<Array<Maybe<CamundaTaskFilter>>>;
  totalElements: Scalars["Long"];
};

export type CamundaTaskListFilterInput = {
  filterId?: InputMaybe<Scalars["String"]>;
};

export type CamundaTaskOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<CamundaTaskOrderByProperty>;
};

export enum CamundaTaskOrderByProperty {
  Assignee = "ASSIGNEE",
  CreationDate = "CREATION_DATE",
  DueDate = "DUE_DATE",
  FollowUpDate = "FOLLOW_UP_DATE",
  Name = "NAME",
  ProcessDefinitionKey = "PROCESS_DEFINITION_KEY",
  ProcessInstanceKey = "PROCESS_INSTANCE_KEY",
  ProcessName = "PROCESS_NAME",
  TaskState = "TASK_STATE",
}

export type CamundaTaskResultPage = {
  __typename?: "CamundaTaskResultPage";
  content?: Maybe<Array<Maybe<CamundaTask>>>;
  totalElements: Scalars["Long"];
};

export enum CamundaTaskState {
  Completed = "COMPLETED",
  Created = "CREATED",
}

export type ClaimInputDto = {
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  policy?: InputMaybe<PolicyInputDto>;
  timestamp?: InputMaybe<Scalars["DateTime"]>;
};

export type ClaimOutputDto = {
  __typename?: "ClaimOutputDto";
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  policy?: Maybe<PolicyOutputDto>;
  timestamp?: Maybe<Scalars["DateTime"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  completeCamundaTask?: Maybe<Scalars["Void"]>;
  deleteCamundaTaskFilter?: Maybe<Scalars["Void"]>;
  deleteClaim?: Maybe<Scalars["Void"]>;
  deletePolicy?: Maybe<Scalars["Void"]>;
  deletePolicyType?: Maybe<Scalars["Void"]>;
  deletePolicyholder?: Maybe<Scalars["Void"]>;
  runClaimProcess?: Maybe<Scalars["Void"]>;
  startCamundaProcess?: Maybe<Scalars["Void"]>;
  updateClaim: ClaimOutputDto;
  updatePolicy: PolicyOutputDto;
  updatePolicyType: PolicyTypeDto;
  updatePolicyholder: PolicyholderDto;
  updateTaskFilter: CamundaTaskFilter;
};

export type MutationCompleteCamundaTaskArgs = {
  taskId: Scalars["String"];
  variables?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteCamundaTaskFilterArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteClaimArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePolicyArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePolicyTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePolicyholderArgs = {
  id: Scalars["ID"];
};

export type MutationRunClaimProcessArgs = {
  policyId: Scalars["Long"];
};

export type MutationStartCamundaProcessArgs = {
  bpmnProcessId: Scalars["String"];
  variables?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateClaimArgs = {
  input: ClaimInputDto;
};

export type MutationUpdatePolicyArgs = {
  input: PolicyInputDto;
};

export type MutationUpdatePolicyTypeArgs = {
  input: PolicyTypeDtoInput;
};

export type MutationUpdatePolicyholderArgs = {
  input: PolicyholderDtoInput;
};

export type MutationUpdateTaskFilterArgs = {
  input: CamundaTaskFilterInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type PolicyInputDto = {
  caseDescription?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  insurancePremium?: InputMaybe<Scalars["BigDecimal"]>;
  insuranceSum?: InputMaybe<Scalars["BigDecimal"]>;
  name?: InputMaybe<Scalars["String"]>;
  policyType?: InputMaybe<PolicyTypeDtoInput>;
  policyholder?: InputMaybe<PolicyholderDtoInput>;
};

export type PolicyOutputDto = {
  __typename?: "PolicyOutputDto";
  caseDescription?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  insurancePremium?: Maybe<Scalars["BigDecimal"]>;
  insuranceSum?: Maybe<Scalars["BigDecimal"]>;
  name?: Maybe<Scalars["String"]>;
  policyType?: Maybe<PolicyTypeDto>;
  policyholder?: Maybe<PolicyholderDto>;
};

export type PolicyTypeDto = {
  __typename?: "PolicyTypeDto";
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PolicyTypeDtoInput = {
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type PolicyholderDto = {
  __typename?: "PolicyholderDto";
  address?: Maybe<Scalars["String"]>;
  dateOfBirth?: Maybe<Scalars["Date"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PolicyholderDtoInput = {
  address?: InputMaybe<Scalars["String"]>;
  dateOfBirth?: InputMaybe<Scalars["Date"]>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  camundaForm: CamundaForm;
  camundaProcessDefinitionList: CamundaProcessDefinitionResultPage;
  camundaTask: CamundaTask;
  camundaTaskFilter: CamundaTaskFilter;
  camundaTaskFilterList: CamundaTaskFilterResultPage;
  camundaTaskList: CamundaTaskResultPage;
  camundaVariables?: Maybe<Scalars["String"]>;
  checkAuthenticated?: Maybe<Scalars["Void"]>;
  claim: ClaimOutputDto;
  claimList: Array<Maybe<ClaimOutputDto>>;
  policy: PolicyOutputDto;
  policyList: Array<Maybe<PolicyOutputDto>>;
  policyType: PolicyTypeDto;
  policyTypeList: Array<Maybe<PolicyTypeDto>>;
  policyholder: PolicyholderDto;
  policyholderList: Array<Maybe<PolicyholderDto>>;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryCamundaFormArgs = {
  formId?: InputMaybe<Scalars["String"]>;
  processDefinitionId?: InputMaybe<Scalars["String"]>;
};

export type QueryCamundaProcessDefinitionListArgs = {
  filter?: InputMaybe<CamundaProcessDefinitionFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
};

export type QueryCamundaTaskArgs = {
  id: Scalars["String"];
};

export type QueryCamundaTaskFilterArgs = {
  id: Scalars["ID"];
};

export type QueryCamundaTaskFilterListArgs = {
  page?: InputMaybe<OffsetPageInput>;
};

export type QueryCamundaTaskListArgs = {
  filter?: InputMaybe<CamundaTaskListFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<CamundaTaskOrderByInput>>>;
};

export type QueryCamundaVariablesArgs = {
  taskId?: InputMaybe<Scalars["String"]>;
};

export type QueryClaimArgs = {
  id: Scalars["ID"];
};

export type QueryPolicyArgs = {
  id: Scalars["ID"];
};

export type QueryPolicyTypeArgs = {
  id: Scalars["ID"];
};

export type QueryPolicyholderArgs = {
  id: Scalars["ID"];
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type UserInfo = {
  __typename?: "UserInfo";
  avatar?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateTaskFilterMutationVariables = Exact<{
  input: CamundaTaskFilterInput;
}>;

export type UpdateTaskFilterMutation = {
  __typename?: "Mutation";
  updateTaskFilter: {
    __typename?: "CamundaTaskFilter";
    id?: string | null;
    name: string;
    conditions?: Array<{
      __typename?: "CamundaTaskCondition";
      id?: string | null;
      type: CamundaTaskConditionType;
      values?: Array<string | null> | null;
      valueExpression?: string | null;
    } | null> | null;
  };
};

export type CamundaTaskFilterQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type CamundaTaskFilterQuery = {
  __typename?: "Query";
  camundaTaskFilter: {
    __typename?: "CamundaTaskFilter";
    id?: string | null;
    name: string;
    conditions?: Array<{
      __typename?: "CamundaTaskCondition";
      id?: string | null;
      type: CamundaTaskConditionType;
      values?: Array<string | null> | null;
      valueExpression?: string | null;
    } | null> | null;
  };
};

export type CamundaTaskFilterListQueryVariables = Exact<{
  page?: InputMaybe<OffsetPageInput>;
}>;

export type CamundaTaskFilterListQuery = {
  __typename?: "Query";
  camundaTaskFilterList: {
    __typename?: "CamundaTaskFilterResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "CamundaTaskFilter";
      id?: string | null;
      name: string;
      conditions?: Array<{
        __typename?: "CamundaTaskCondition";
        id?: string | null;
        type: CamundaTaskConditionType;
        values?: Array<string | null> | null;
        valueExpression?: string | null;
      } | null> | null;
    } | null> | null;
  };
};

export type DeleteCamundaTaskFilterMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteCamundaTaskFilterMutation = {
  __typename?: "Mutation";
  deleteCamundaTaskFilter?: any | null;
};

export type UpdateClaimMutationVariables = Exact<{
  input: ClaimInputDto;
}>;

export type UpdateClaimMutation = {
  __typename?: "Mutation";
  updateClaim: {
    __typename?: "ClaimOutputDto";
    description?: string | null;
    id?: string | null;
    timestamp?: any | null;
    policy?: {
      __typename?: "PolicyOutputDto";
      caseDescription?: string | null;
      id?: string | null;
      insurancePremium?: any | null;
      insuranceSum?: any | null;
      name?: string | null;
    } | null;
  };
};

export type PolicyList_ClaimCreateQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PolicyList_ClaimCreateQuery = {
  __typename?: "Query";
  policyList: Array<{
    __typename?: "PolicyOutputDto";
    caseDescription?: string | null;
    id?: string | null;
    insurancePremium?: any | null;
    insuranceSum?: any | null;
    name?: string | null;
  } | null>;
};

export type ClaimQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ClaimQuery = {
  __typename?: "Query";
  claim: {
    __typename?: "ClaimOutputDto";
    description?: string | null;
    id?: string | null;
    timestamp?: any | null;
    policy?: {
      __typename?: "PolicyOutputDto";
      caseDescription?: string | null;
      id?: string | null;
      insurancePremium?: any | null;
      insuranceSum?: any | null;
      name?: string | null;
    } | null;
  };
};

export type ClaimListQueryVariables = Exact<{ [key: string]: never }>;

export type ClaimListQuery = {
  __typename?: "Query";
  claimList: Array<{
    __typename?: "ClaimOutputDto";
    description?: string | null;
    id?: string | null;
    timestamp?: any | null;
    policy?: {
      __typename?: "PolicyOutputDto";
      caseDescription?: string | null;
      id?: string | null;
      insurancePremium?: any | null;
      insuranceSum?: any | null;
      name?: string | null;
    } | null;
  } | null>;
};

export type DeleteClaimMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteClaimMutation = {
  __typename?: "Mutation";
  deleteClaim?: any | null;
};

export type UpdatePolicyTypeMutationVariables = Exact<{
  input: PolicyTypeDtoInput;
}>;

export type UpdatePolicyTypeMutation = {
  __typename?: "Mutation";
  updatePolicyType: {
    __typename?: "PolicyTypeDto";
    description?: string | null;
    id?: string | null;
    name?: string | null;
  };
};

export type PolicyTypeQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PolicyTypeQuery = {
  __typename?: "Query";
  policyType: {
    __typename?: "PolicyTypeDto";
    description?: string | null;
    id?: string | null;
    name?: string | null;
  };
};

export type PolicyTypeListQueryVariables = Exact<{ [key: string]: never }>;

export type PolicyTypeListQuery = {
  __typename?: "Query";
  policyTypeList: Array<{
    __typename?: "PolicyTypeDto";
    description?: string | null;
    id?: string | null;
    name?: string | null;
  } | null>;
};

export type DeletePolicyTypeMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeletePolicyTypeMutation = {
  __typename?: "Mutation";
  deletePolicyType?: any | null;
};

export type UpdatePolicyMutationVariables = Exact<{
  input: PolicyInputDto;
}>;

export type UpdatePolicyMutation = {
  __typename?: "Mutation";
  updatePolicy: {
    __typename?: "PolicyOutputDto";
    caseDescription?: string | null;
    id?: string | null;
    insurancePremium?: any | null;
    insuranceSum?: any | null;
    name?: string | null;
    policyType?: {
      __typename?: "PolicyTypeDto";
      description?: string | null;
      id?: string | null;
      name?: string | null;
    } | null;
    policyholder?: {
      __typename?: "PolicyholderDto";
      address?: string | null;
      dateOfBirth?: any | null;
      id?: string | null;
      name?: string | null;
    } | null;
  };
};

export type PolicyTypeList_PolicyCreateQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PolicyTypeList_PolicyCreateQuery = {
  __typename?: "Query";
  policyTypeList: Array<{
    __typename?: "PolicyTypeDto";
    description?: string | null;
    id?: string | null;
    name?: string | null;
  } | null>;
};

export type PolicyholderList_PolicyCreateQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PolicyholderList_PolicyCreateQuery = {
  __typename?: "Query";
  policyholderList: Array<{
    __typename?: "PolicyholderDto";
    address?: string | null;
    dateOfBirth?: any | null;
    id?: string | null;
    name?: string | null;
  } | null>;
};

export type PolicyQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PolicyQuery = {
  __typename?: "Query";
  policy: {
    __typename?: "PolicyOutputDto";
    caseDescription?: string | null;
    id?: string | null;
    insurancePremium?: any | null;
    insuranceSum?: any | null;
    name?: string | null;
    policyType?: {
      __typename?: "PolicyTypeDto";
      description?: string | null;
      id?: string | null;
      name?: string | null;
    } | null;
    policyholder?: {
      __typename?: "PolicyholderDto";
      address?: string | null;
      dateOfBirth?: any | null;
      id?: string | null;
      name?: string | null;
    } | null;
  };
};

export type PolicyListQueryVariables = Exact<{ [key: string]: never }>;

export type PolicyListQuery = {
  __typename?: "Query";
  policyList: Array<{
    __typename?: "PolicyOutputDto";
    caseDescription?: string | null;
    id?: string | null;
    insurancePremium?: any | null;
    insuranceSum?: any | null;
    name?: string | null;
    policyType?: {
      __typename?: "PolicyTypeDto";
      description?: string | null;
      id?: string | null;
      name?: string | null;
    } | null;
    policyholder?: {
      __typename?: "PolicyholderDto";
      address?: string | null;
      dateOfBirth?: any | null;
      id?: string | null;
      name?: string | null;
    } | null;
  } | null>;
};

export type DeletePolicyMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeletePolicyMutation = {
  __typename?: "Mutation";
  deletePolicy?: any | null;
};

export type RunClaimProcess_StartProcessButtonMutationVariables = Exact<{
  policyId: Scalars["Long"];
}>;

export type RunClaimProcess_StartProcessButtonMutation = {
  __typename?: "Mutation";
  runClaimProcess?: any | null;
};

export type UpdatePolicyholderMutationVariables = Exact<{
  input: PolicyholderDtoInput;
}>;

export type UpdatePolicyholderMutation = {
  __typename?: "Mutation";
  updatePolicyholder: {
    __typename?: "PolicyholderDto";
    address?: string | null;
    dateOfBirth?: any | null;
    id?: string | null;
    name?: string | null;
  };
};

export type PolicyholderQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PolicyholderQuery = {
  __typename?: "Query";
  policyholder: {
    __typename?: "PolicyholderDto";
    address?: string | null;
    dateOfBirth?: any | null;
    id?: string | null;
    name?: string | null;
  };
};

export type PolicyholderListQueryVariables = Exact<{ [key: string]: never }>;

export type PolicyholderListQuery = {
  __typename?: "Query";
  policyholderList: Array<{
    __typename?: "PolicyholderDto";
    address?: string | null;
    dateOfBirth?: any | null;
    id?: string | null;
    name?: string | null;
  } | null>;
};

export type DeletePolicyholderMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeletePolicyholderMutation = {
  __typename?: "Mutation";
  deletePolicyholder?: any | null;
};

export type CamundaProcessDefinitionListQueryVariables = Exact<{
  page?: InputMaybe<OffsetPageInput>;
  filter?: InputMaybe<CamundaProcessDefinitionFilterInput>;
}>;

export type CamundaProcessDefinitionListQuery = {
  __typename?: "Query";
  camundaProcessDefinitionList: {
    __typename?: "CamundaProcessDefinitionResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "CamundaProcessDefinition";
      id?: string | null;
      key?: any | null;
      name?: string | null;
      bpmnProcessId?: string | null;
      resource?: string | null;
    } | null> | null;
  };
};

export type StartCamundaProcessMutationVariables = Exact<{
  bpmnProcessId: Scalars["String"];
  variables?: InputMaybe<Scalars["String"]>;
}>;

export type StartCamundaProcessMutation = {
  __typename?: "Mutation";
  startCamundaProcess?: any | null;
};

export type TaskQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type TaskQuery = {
  __typename?: "Query";
  camundaTask: {
    __typename?: "CamundaTask";
    id?: string | null;
    assignee?: string | null;
    creationDate?: any | null;
    dueDate?: any | null;
    followUpDate?: any | null;
    formKey?: string | null;
    name?: string | null;
    processDefinitionKey?: string | null;
    processInstanceKey?: string | null;
    processName?: string | null;
    taskState?: CamundaTaskState | null;
  };
};

export type CompleteCamundaTask_TaskFormMutationVariables = Exact<{
  id: Scalars["String"];
  variables?: InputMaybe<Scalars["String"]>;
}>;

export type CompleteCamundaTask_TaskFormMutation = {
  __typename?: "Mutation";
  completeCamundaTask?: any | null;
};

export type CamundaForm_TaskFormQueryVariables = Exact<{
  processDefinitionId?: InputMaybe<Scalars["String"]>;
  formId?: InputMaybe<Scalars["String"]>;
}>;

export type CamundaForm_TaskFormQuery = {
  __typename?: "Query";
  camundaForm: {
    __typename?: "CamundaForm";
    id?: string | null;
    processDefinitionId?: string | null;
    schema?: string | null;
  };
};

export type CamundaVariablesQueryVariables = Exact<{
  taskId?: InputMaybe<Scalars["String"]>;
}>;

export type CamundaVariablesQuery = {
  __typename?: "Query";
  camundaVariables?: string | null;
};

export type CamundaTaskList_CamundaTaskListQueryVariables = Exact<{
  sort?: InputMaybe<
    | Array<InputMaybe<CamundaTaskOrderByInput>>
    | InputMaybe<CamundaTaskOrderByInput>
  >;
  page?: InputMaybe<OffsetPageInput>;
}>;

export type CamundaTaskList_CamundaTaskListQuery = {
  __typename?: "Query";
  camundaTaskList: {
    __typename?: "CamundaTaskResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "CamundaTask";
      assignee?: string | null;
      creationDate?: any | null;
      dueDate?: any | null;
      followUpDate?: any | null;
      id?: string | null;
      name?: string | null;
      processName?: string | null;
      processInstanceKey?: string | null;
      taskState?: CamundaTaskState | null;
    } | null> | null;
  };
};

export type UserPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type UserPermissionsQuery = {
  __typename?: "Query";
  userPermissions?: Array<string | null> | null;
};

export const UpdateTaskFilterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTaskFilter" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CamundaTaskFilterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTaskFilter" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "conditions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "values" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "valueExpression" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateTaskFilterMutation,
  UpdateTaskFilterMutationVariables
>;
export const CamundaTaskFilterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CamundaTaskFilter" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "camundaTaskFilter" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "conditions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "values" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "valueExpression" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CamundaTaskFilterQuery,
  CamundaTaskFilterQueryVariables
>;
export const CamundaTaskFilterListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CamundaTaskFilterList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "camundaTaskFilterList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "conditions" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "values" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "valueExpression" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CamundaTaskFilterListQuery,
  CamundaTaskFilterListQueryVariables
>;
export const DeleteCamundaTaskFilterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteCamundaTaskFilter" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteCamundaTaskFilter" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCamundaTaskFilterMutation,
  DeleteCamundaTaskFilterMutationVariables
>;
export const UpdateClaimDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateClaim" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ClaimInputDto" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateClaim" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "caseDescription" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "insurancePremium" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "insuranceSum" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateClaimMutation, UpdateClaimMutationVariables>;
export const PolicyList_ClaimCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PolicyList_ClaimCreate" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policyList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "caseDescription" },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "insurancePremium" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "insuranceSum" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PolicyList_ClaimCreateQuery,
  PolicyList_ClaimCreateQueryVariables
>;
export const ClaimDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Claim" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "claim" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "caseDescription" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "insurancePremium" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "insuranceSum" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClaimQuery, ClaimQueryVariables>;
export const ClaimListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ClaimList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "claimList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "caseDescription" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "insurancePremium" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "insuranceSum" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClaimListQuery, ClaimListQueryVariables>;
export const DeleteClaimDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteClaim" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteClaim" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteClaimMutation, DeleteClaimMutationVariables>;
export const UpdatePolicyTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePolicyType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PolicyTypeDtoInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePolicyType" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePolicyTypeMutation,
  UpdatePolicyTypeMutationVariables
>;
export const PolicyTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PolicyType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policyType" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PolicyTypeQuery, PolicyTypeQueryVariables>;
export const PolicyTypeListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PolicyTypeList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policyTypeList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PolicyTypeListQuery, PolicyTypeListQueryVariables>;
export const DeletePolicyTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePolicyType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePolicyType" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeletePolicyTypeMutation,
  DeletePolicyTypeMutationVariables
>;
export const UpdatePolicyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePolicy" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PolicyInputDto" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePolicy" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "caseDescription" },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "insurancePremium" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "insuranceSum" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policyType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policyholder" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dateOfBirth" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePolicyMutation,
  UpdatePolicyMutationVariables
>;
export const PolicyTypeList_PolicyCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PolicyTypeList_PolicyCreate" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policyTypeList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PolicyTypeList_PolicyCreateQuery,
  PolicyTypeList_PolicyCreateQueryVariables
>;
export const PolicyholderList_PolicyCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PolicyholderList_PolicyCreate" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policyholderList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "dateOfBirth" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PolicyholderList_PolicyCreateQuery,
  PolicyholderList_PolicyCreateQueryVariables
>;
export const PolicyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Policy" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policy" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "caseDescription" },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "insurancePremium" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "insuranceSum" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policyType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policyholder" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dateOfBirth" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PolicyQuery, PolicyQueryVariables>;
export const PolicyListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PolicyList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policyList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "caseDescription" },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "insurancePremium" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "insuranceSum" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policyType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "policyholder" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dateOfBirth" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PolicyListQuery, PolicyListQueryVariables>;
export const DeletePolicyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePolicy" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePolicy" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeletePolicyMutation,
  DeletePolicyMutationVariables
>;
export const RunClaimProcess_StartProcessButtonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RunClaimProcess_StartProcessButton" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "policyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Long" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "runClaimProcess" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "policyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "policyId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RunClaimProcess_StartProcessButtonMutation,
  RunClaimProcess_StartProcessButtonMutationVariables
>;
export const UpdatePolicyholderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePolicyholder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PolicyholderDtoInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePolicyholder" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "dateOfBirth" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePolicyholderMutation,
  UpdatePolicyholderMutationVariables
>;
export const PolicyholderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Policyholder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policyholder" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "dateOfBirth" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PolicyholderQuery, PolicyholderQueryVariables>;
export const PolicyholderListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PolicyholderList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "policyholderList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "dateOfBirth" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PolicyholderListQuery,
  PolicyholderListQueryVariables
>;
export const DeletePolicyholderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePolicyholder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePolicyholder" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeletePolicyholderMutation,
  DeletePolicyholderMutationVariables
>;
export const CamundaProcessDefinitionListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CamundaProcessDefinitionList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "CamundaProcessDefinitionFilterInput",
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "camundaProcessDefinitionList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "key" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "bpmnProcessId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "resource" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CamundaProcessDefinitionListQuery,
  CamundaProcessDefinitionListQueryVariables
>;
export const StartCamundaProcessDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StartCamundaProcess" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "bpmnProcessId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "variables" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "startCamundaProcess" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "bpmnProcessId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "bpmnProcessId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "variables" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "variables" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StartCamundaProcessMutation,
  StartCamundaProcessMutationVariables
>;
export const TaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Task" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "camundaTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "assignee" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "creationDate" },
                },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "followUpDate" },
                },
                { kind: "Field", name: { kind: "Name", value: "formKey" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "processDefinitionKey" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "processInstanceKey" },
                },
                { kind: "Field", name: { kind: "Name", value: "processName" } },
                { kind: "Field", name: { kind: "Name", value: "taskState" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TaskQuery, TaskQueryVariables>;
export const CompleteCamundaTask_TaskFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CompleteCamundaTask_TaskForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "variables" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "completeCamundaTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "taskId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "variables" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "variables" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CompleteCamundaTask_TaskFormMutation,
  CompleteCamundaTask_TaskFormMutationVariables
>;
export const CamundaForm_TaskFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CamundaForm_TaskForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "processDefinitionId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "formId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "camundaForm" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "processDefinitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "processDefinitionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "processDefinitionId" },
                },
                { kind: "Field", name: { kind: "Name", value: "schema" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CamundaForm_TaskFormQuery,
  CamundaForm_TaskFormQueryVariables
>;
export const CamundaVariablesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "camundaVariables" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "taskId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "camundaVariables" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "taskId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "taskId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CamundaVariablesQuery,
  CamundaVariablesQueryVariables
>;
export const CamundaTaskList_CamundaTaskListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CamundaTaskList_CamundaTaskList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CamundaTaskOrderByInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "camundaTaskList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "assignee" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creationDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dueDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "followUpDate" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "processName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "processInstanceKey" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "taskState" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CamundaTaskList_CamundaTaskListQuery,
  CamundaTaskList_CamundaTaskListQueryVariables
>;
export const UserPermissionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userPermissions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "userPermissions" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserPermissionsQuery,
  UserPermissionsQueryVariables
>;
