/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "mutation UpdateTaskFilter($input: CamundaTaskFilterInput!) {\n  updateTaskFilter(input: $input) {\n    id\n    name\n    conditions {\n      id\n      type\n      values\n      valueExpression\n    }\n  }\n}":
    types.UpdateTaskFilterDocument,
  "query CamundaTaskFilter($id: ID!) {\n  camundaTaskFilter(id: $id) {\n    id\n    name\n    conditions {\n      id\n      type\n      values\n      valueExpression\n    }\n  }\n}":
    types.CamundaTaskFilterDocument,
  "query CamundaTaskFilterList($page: OffsetPageInput) {\n    camundaTaskFilterList(page: $page) {\n      content {\n        id\n        name\n        conditions {\n          id\n          type\n          values\n          valueExpression\n        }\n      }\n      totalElements\n    }\n  }":
    types.CamundaTaskFilterListDocument,
  "\nmutation DeleteCamundaTaskFilter($id: ID!) {\n  deleteCamundaTaskFilter(id: $id)\n}\n":
    types.DeleteCamundaTaskFilterDocument,
  "mutation UpdateClaim($input: ClaimInputDto!) {\n  updateClaim(input: $input) {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}":
    types.UpdateClaimDocument,
  "\nquery PolicyList_ClaimCreate {\n    policyList {\n        caseDescription\n        id\n        insurancePremium\n        insuranceSum\n        name\n    }\n}\n":
    types.PolicyList_ClaimCreateDocument,
  "query Claim($id: ID!) {\n  claim(id: $id) {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}":
    types.ClaimDocument,
  "query ClaimList {\n  claimList {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}":
    types.ClaimListDocument,
  "mutation DeleteClaim($id: ID!) {\n  deleteClaim(id: $id) \n}":
    types.DeleteClaimDocument,
  "mutation UpdatePolicyType($input: PolicyTypeDtoInput!) {\n  updatePolicyType(input: $input) {\n    description\n    id\n    name\n  }\n}":
    types.UpdatePolicyTypeDocument,
  "query PolicyType($id: ID!) {\n  policyType(id: $id) {\n    description\n    id\n    name\n  }\n}":
    types.PolicyTypeDocument,
  "query PolicyTypeList {\n  policyTypeList {\n    description\n    id\n    name\n  }\n}":
    types.PolicyTypeListDocument,
  "mutation DeletePolicyType($id: ID!) {\n  deletePolicyType(id: $id) \n}":
    types.DeletePolicyTypeDocument,
  "mutation UpdatePolicy($input: PolicyInputDto!) {\n  updatePolicy(input: $input) {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}":
    types.UpdatePolicyDocument,
  "\nquery PolicyTypeList_PolicyCreate {\n    policyTypeList {\n        description\n        id\n        name\n    }\n}\n":
    types.PolicyTypeList_PolicyCreateDocument,
  "\nquery PolicyholderList_PolicyCreate {\n    policyholderList {\n        address\n        dateOfBirth\n        id\n        name\n    }\n}\n":
    types.PolicyholderList_PolicyCreateDocument,
  "query Policy($id: ID!) {\n  policy(id: $id) {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}":
    types.PolicyDocument,
  "query PolicyList {\n  policyList {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}":
    types.PolicyListDocument,
  "mutation DeletePolicy($id: ID!) {\n  deletePolicy(id: $id) \n}":
    types.DeletePolicyDocument,
  "\nmutation RunClaimProcess_StartProcessButton($policyId: Long!) {\n    runClaimProcess(policyId: $policyId)\n}\n":
    types.RunClaimProcess_StartProcessButtonDocument,
  "mutation UpdatePolicyholder($input: PolicyholderDtoInput!) {\n  updatePolicyholder(input: $input) {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}":
    types.UpdatePolicyholderDocument,
  "query Policyholder($id: ID!) {\n  policyholder(id: $id) {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}":
    types.PolicyholderDocument,
  "query PolicyholderList {\n  policyholderList {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}":
    types.PolicyholderListDocument,
  "mutation DeletePolicyholder($id: ID!) {\n  deletePolicyholder(id: $id) \n}":
    types.DeletePolicyholderDocument,
  "query CamundaProcessDefinitionList($page: OffsetPageInput, $filter: CamundaProcessDefinitionFilterInput) {\n    camundaProcessDefinitionList(page: $page, filter: $filter) {\n      content {\n        id\n        key\n        name\n        bpmnProcessId\n        resource\n      }\n      totalElements\n    }\n  }":
    types.CamundaProcessDefinitionListDocument,
  "\nmutation StartCamundaProcess($bpmnProcessId: String!, $variables: String) {\n  startCamundaProcess(bpmnProcessId: $bpmnProcessId, variables: $variables)\n}\n":
    types.StartCamundaProcessDocument,
  "query Task($id: String!) {\n  camundaTask(id: $id) {\n    id\n    assignee\n    creationDate\n    dueDate\n    followUpDate\n    formKey\n    name\n    processDefinitionKey\n    processInstanceKey\n    processName\n  }\n}":
    types.TaskDocument,
  "\nmutation CompleteCamundaTask_TaskForm(\n    $id: String!,\n    $variables: String\n) {\n    completeCamundaTask(\n        taskId: $id,\n        variables: $variables)               \n}\n":
    types.CompleteCamundaTask_TaskFormDocument,
  "\nquery CamundaForm_TaskForm(\n    $processDefinitionId: String,\n    $formId: String\n) {\n    camundaForm(\n        formId: $formId,\n        processDefinitionId: $processDefinitionId\n) {\n        id\n        processDefinitionId\n        schema\n    }\n}\n":
    types.CamundaForm_TaskFormDocument,
  "query CamundaTaskList_CamundaTaskList(\n  $sort: [CamundaTaskOrderByInput]\n  $page: OffsetPageInput\n) {\n  camundaTaskList(\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      assignee\n      creationDate\n      name\n      processName\n    }\n    totalElements\n  }\n}":
    types.CamundaTaskList_CamundaTaskListDocument,
  "\n     query userPermissions {\n         userPermissions\n     }\n":
    types.UserPermissionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateTaskFilter($input: CamundaTaskFilterInput!) {\n  updateTaskFilter(input: $input) {\n    id\n    name\n    conditions {\n      id\n      type\n      values\n      valueExpression\n    }\n  }\n}"
): (typeof documents)["mutation UpdateTaskFilter($input: CamundaTaskFilterInput!) {\n  updateTaskFilter(input: $input) {\n    id\n    name\n    conditions {\n      id\n      type\n      values\n      valueExpression\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query CamundaTaskFilter($id: ID!) {\n  camundaTaskFilter(id: $id) {\n    id\n    name\n    conditions {\n      id\n      type\n      values\n      valueExpression\n    }\n  }\n}"
): (typeof documents)["query CamundaTaskFilter($id: ID!) {\n  camundaTaskFilter(id: $id) {\n    id\n    name\n    conditions {\n      id\n      type\n      values\n      valueExpression\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query CamundaTaskFilterList($page: OffsetPageInput) {\n    camundaTaskFilterList(page: $page) {\n      content {\n        id\n        name\n        conditions {\n          id\n          type\n          values\n          valueExpression\n        }\n      }\n      totalElements\n    }\n  }"
): (typeof documents)["query CamundaTaskFilterList($page: OffsetPageInput) {\n    camundaTaskFilterList(page: $page) {\n      content {\n        id\n        name\n        conditions {\n          id\n          type\n          values\n          valueExpression\n        }\n      }\n      totalElements\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation DeleteCamundaTaskFilter($id: ID!) {\n  deleteCamundaTaskFilter(id: $id)\n}\n"
): (typeof documents)["\nmutation DeleteCamundaTaskFilter($id: ID!) {\n  deleteCamundaTaskFilter(id: $id)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateClaim($input: ClaimInputDto!) {\n  updateClaim(input: $input) {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}"
): (typeof documents)["mutation UpdateClaim($input: ClaimInputDto!) {\n  updateClaim(input: $input) {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery PolicyList_ClaimCreate {\n    policyList {\n        caseDescription\n        id\n        insurancePremium\n        insuranceSum\n        name\n    }\n}\n"
): (typeof documents)["\nquery PolicyList_ClaimCreate {\n    policyList {\n        caseDescription\n        id\n        insurancePremium\n        insuranceSum\n        name\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Claim($id: ID!) {\n  claim(id: $id) {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}"
): (typeof documents)["query Claim($id: ID!) {\n  claim(id: $id) {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query ClaimList {\n  claimList {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}"
): (typeof documents)["query ClaimList {\n  claimList {\n    description\n    id\n    policy {\n      caseDescription\n      id\n      insurancePremium\n      insuranceSum\n      name\n    }\n    timestamp\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteClaim($id: ID!) {\n  deleteClaim(id: $id) \n}"
): (typeof documents)["mutation DeleteClaim($id: ID!) {\n  deleteClaim(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdatePolicyType($input: PolicyTypeDtoInput!) {\n  updatePolicyType(input: $input) {\n    description\n    id\n    name\n  }\n}"
): (typeof documents)["mutation UpdatePolicyType($input: PolicyTypeDtoInput!) {\n  updatePolicyType(input: $input) {\n    description\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PolicyType($id: ID!) {\n  policyType(id: $id) {\n    description\n    id\n    name\n  }\n}"
): (typeof documents)["query PolicyType($id: ID!) {\n  policyType(id: $id) {\n    description\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PolicyTypeList {\n  policyTypeList {\n    description\n    id\n    name\n  }\n}"
): (typeof documents)["query PolicyTypeList {\n  policyTypeList {\n    description\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeletePolicyType($id: ID!) {\n  deletePolicyType(id: $id) \n}"
): (typeof documents)["mutation DeletePolicyType($id: ID!) {\n  deletePolicyType(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdatePolicy($input: PolicyInputDto!) {\n  updatePolicy(input: $input) {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}"
): (typeof documents)["mutation UpdatePolicy($input: PolicyInputDto!) {\n  updatePolicy(input: $input) {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery PolicyTypeList_PolicyCreate {\n    policyTypeList {\n        description\n        id\n        name\n    }\n}\n"
): (typeof documents)["\nquery PolicyTypeList_PolicyCreate {\n    policyTypeList {\n        description\n        id\n        name\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery PolicyholderList_PolicyCreate {\n    policyholderList {\n        address\n        dateOfBirth\n        id\n        name\n    }\n}\n"
): (typeof documents)["\nquery PolicyholderList_PolicyCreate {\n    policyholderList {\n        address\n        dateOfBirth\n        id\n        name\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Policy($id: ID!) {\n  policy(id: $id) {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}"
): (typeof documents)["query Policy($id: ID!) {\n  policy(id: $id) {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PolicyList {\n  policyList {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}"
): (typeof documents)["query PolicyList {\n  policyList {\n    caseDescription\n    id\n    insurancePremium\n    insuranceSum\n    name\n    policyType {\n      description\n      id\n      name\n    }\n    policyholder {\n      address\n      dateOfBirth\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeletePolicy($id: ID!) {\n  deletePolicy(id: $id) \n}"
): (typeof documents)["mutation DeletePolicy($id: ID!) {\n  deletePolicy(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation RunClaimProcess_StartProcessButton($policyId: Long!) {\n    runClaimProcess(policyId: $policyId)\n}\n"
): (typeof documents)["\nmutation RunClaimProcess_StartProcessButton($policyId: Long!) {\n    runClaimProcess(policyId: $policyId)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdatePolicyholder($input: PolicyholderDtoInput!) {\n  updatePolicyholder(input: $input) {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}"
): (typeof documents)["mutation UpdatePolicyholder($input: PolicyholderDtoInput!) {\n  updatePolicyholder(input: $input) {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Policyholder($id: ID!) {\n  policyholder(id: $id) {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}"
): (typeof documents)["query Policyholder($id: ID!) {\n  policyholder(id: $id) {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PolicyholderList {\n  policyholderList {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}"
): (typeof documents)["query PolicyholderList {\n  policyholderList {\n    address\n    dateOfBirth\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeletePolicyholder($id: ID!) {\n  deletePolicyholder(id: $id) \n}"
): (typeof documents)["mutation DeletePolicyholder($id: ID!) {\n  deletePolicyholder(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query CamundaProcessDefinitionList($page: OffsetPageInput, $filter: CamundaProcessDefinitionFilterInput) {\n    camundaProcessDefinitionList(page: $page, filter: $filter) {\n      content {\n        id\n        key\n        name\n        bpmnProcessId\n        resource\n      }\n      totalElements\n    }\n  }"
): (typeof documents)["query CamundaProcessDefinitionList($page: OffsetPageInput, $filter: CamundaProcessDefinitionFilterInput) {\n    camundaProcessDefinitionList(page: $page, filter: $filter) {\n      content {\n        id\n        key\n        name\n        bpmnProcessId\n        resource\n      }\n      totalElements\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation StartCamundaProcess($bpmnProcessId: String!, $variables: String) {\n  startCamundaProcess(bpmnProcessId: $bpmnProcessId, variables: $variables)\n}\n"
): (typeof documents)["\nmutation StartCamundaProcess($bpmnProcessId: String!, $variables: String) {\n  startCamundaProcess(bpmnProcessId: $bpmnProcessId, variables: $variables)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Task($id: String!) {\n  camundaTask(id: $id) {\n    id\n    assignee\n    creationDate\n    dueDate\n    followUpDate\n    formKey\n    name\n    processDefinitionKey\n    processInstanceKey\n    processName\n  }\n}"
): (typeof documents)["query Task($id: String!) {\n  camundaTask(id: $id) {\n    id\n    assignee\n    creationDate\n    dueDate\n    followUpDate\n    formKey\n    name\n    processDefinitionKey\n    processInstanceKey\n    processName\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation CompleteCamundaTask_TaskForm(\n    $id: String!,\n    $variables: String\n) {\n    completeCamundaTask(\n        taskId: $id,\n        variables: $variables)               \n}\n"
): (typeof documents)["\nmutation CompleteCamundaTask_TaskForm(\n    $id: String!,\n    $variables: String\n) {\n    completeCamundaTask(\n        taskId: $id,\n        variables: $variables)               \n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery CamundaForm_TaskForm(\n    $processDefinitionId: String,\n    $formId: String\n) {\n    camundaForm(\n        formId: $formId,\n        processDefinitionId: $processDefinitionId\n) {\n        id\n        processDefinitionId\n        schema\n    }\n}\n"
): (typeof documents)["\nquery CamundaForm_TaskForm(\n    $processDefinitionId: String,\n    $formId: String\n) {\n    camundaForm(\n        formId: $formId,\n        processDefinitionId: $processDefinitionId\n) {\n        id\n        processDefinitionId\n        schema\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query CamundaTaskList_CamundaTaskList(\n  $sort: [CamundaTaskOrderByInput]\n  $page: OffsetPageInput\n) {\n  camundaTaskList(\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      assignee\n      creationDate\n      name\n      processName\n    }\n    totalElements\n  }\n}"
): (typeof documents)["query CamundaTaskList_CamundaTaskList(\n  $sort: [CamundaTaskOrderByInput]\n  $page: OffsetPageInput\n) {\n  camundaTaskList(\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      assignee\n      creationDate\n      name\n      processName\n    }\n    totalElements\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n     query userPermissions {\n         userPermissions\n     }\n"
): (typeof documents)["\n     query userPermissions {\n         userPermissions\n     }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
