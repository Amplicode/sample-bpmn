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
  schema?: Maybe<Scalars["String"]>;
};

export type CamundaTask = {
  __typename?: "CamundaTask";
  assignee?: Maybe<Scalars["String"]>;
  candidateGroups?: Maybe<Array<Maybe<Scalars["String"]>>>;
  candidateUsers?: Maybe<Array<Maybe<Scalars["String"]>>>;
  completionDate?: Maybe<Scalars["String"]>;
  creationDate?: Maybe<Scalars["String"]>;
  dueDate?: Maybe<Scalars["DateTime"]>;
  followUpDate?: Maybe<Scalars["DateTime"]>;
  form?: Maybe<CamundaForm>;
  formKey?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  processDefinitionKey?: Maybe<Scalars["String"]>;
  processInstanceKey?: Maybe<Scalars["String"]>;
  processName?: Maybe<Scalars["String"]>;
  taskState?: Maybe<CamundaTaskState>;
};

export type CamundaTaskOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<CamundaTaskOrderByProperty>;
};

export enum CamundaTaskOrderByProperty {
  CreationDate = "CREATION_DATE",
  DueDate = "DUE_DATE",
  FollowUpDate = "FOLLOW_UP_DATE",
}

export type CamundaTaskResultPage = {
  __typename?: "CamundaTaskResultPage";
  content?: Maybe<Array<Maybe<CamundaTask>>>;
  totalElements: Scalars["Long"];
};

export enum CamundaTaskState {
  Canceled = "CANCELED",
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
  completeTask?: Maybe<Scalars["Void"]>;
  deleteClaim?: Maybe<Scalars["Void"]>;
  deletePolicy?: Maybe<Scalars["Void"]>;
  deletePolicyType?: Maybe<Scalars["Void"]>;
  deletePolicyholder?: Maybe<Scalars["Void"]>;
  runClaimProcess?: Maybe<Scalars["Void"]>;
  updateClaim: ClaimOutputDto;
  updatePolicy: PolicyOutputDto;
  updatePolicyType: PolicyTypeDto;
  updatePolicyholder: PolicyholderDto;
};

export type MutationCompleteTaskArgs = {
  id: Scalars["String"];
  variables?: InputMaybe<Scalars["String"]>;
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
  assignedTaskList: CamundaTaskResultPage;
  checkAuthenticated?: Maybe<Scalars["Void"]>;
  claim: ClaimOutputDto;
  claimList: Array<Maybe<ClaimOutputDto>>;
  policy: PolicyOutputDto;
  policyList: Array<Maybe<PolicyOutputDto>>;
  policyType: PolicyTypeDto;
  policyTypeList: Array<Maybe<PolicyTypeDto>>;
  policyholder: PolicyholderDto;
  policyholderList: Array<Maybe<PolicyholderDto>>;
  task: CamundaTask;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryAssignedTaskListArgs = {
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<CamundaTaskOrderByInput>>>;
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

export type QueryTaskArgs = {
  id: Scalars["String"];
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

export type TaskQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type TaskQuery = {
  __typename?: "Query";
  task: {
    __typename?: "CamundaTask";
    assignee?: string | null;
    completionDate?: string | null;
    creationDate?: string | null;
    dueDate?: any | null;
    followUpDate?: any | null;
    formKey?: string | null;
    id?: string | null;
    name?: string | null;
    processDefinitionKey?: string | null;
    processInstanceKey?: string | null;
    processName?: string | null;
    taskState?: CamundaTaskState | null;
    form?: {
      __typename?: "CamundaForm";
      id?: string | null;
      schema?: string | null;
    } | null;
  };
};

export type CompleteTask_TaskFormMutationVariables = Exact<{
  id: Scalars["String"];
  variables?: InputMaybe<Scalars["String"]>;
}>;

export type CompleteTask_TaskFormMutation = {
  __typename?: "Mutation";
  completeTask?: any | null;
};

export type AssignedTaskList_AssignedTaskListQueryVariables = Exact<{
  sort?: InputMaybe<
    | Array<InputMaybe<CamundaTaskOrderByInput>>
    | InputMaybe<CamundaTaskOrderByInput>
  >;
  page?: InputMaybe<OffsetPageInput>;
}>;

export type AssignedTaskList_AssignedTaskListQuery = {
  __typename?: "Query";
  assignedTaskList: {
    __typename?: "CamundaTaskResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "CamundaTask";
      assignee?: string | null;
      creationDate?: string | null;
      id?: string | null;
      name?: string | null;
      processName?: string | null;
    } | null> | null;
  };
};

export type UserPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type UserPermissionsQuery = {
  __typename?: "Query";
  userPermissions?: Array<string | null> | null;
};

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
            name: { kind: "Name", value: "task" },
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
                { kind: "Field", name: { kind: "Name", value: "assignee" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "completionDate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "creationDate" },
                },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "followUpDate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "form" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "schema" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "formKey" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
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
export const CompleteTask_TaskFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CompleteTask_TaskForm" },
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
            name: { kind: "Name", value: "completeTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
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
  CompleteTask_TaskFormMutation,
  CompleteTask_TaskFormMutationVariables
>;
export const AssignedTaskList_AssignedTaskListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AssignedTaskList_AssignedTaskList" },
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
            name: { kind: "Name", value: "assignedTaskList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "assignee" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creationDate" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "processName" },
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
  AssignedTaskList_AssignedTaskListQuery,
  AssignedTaskList_AssignedTaskListQueryVariables
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
