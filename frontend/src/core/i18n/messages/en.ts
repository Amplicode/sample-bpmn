import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
  ...englishMessages,

  resources: {
    CamundaTask: {
      name: "Camunda Task |||| Camunda Tasks",

      fields: {
        assignee: "Assignee",
        completionDate: "Completion Date",
        creationDate: "Creation Date",
        dueDate: "Due Date",
        followUpDate: "Follow Up Date",

        form: {
          id: "Form"
        },

        formKey: "Form Key",
        name: "Name",
        processDefinitionKey: "Process Definition Key",
        processInstanceKey: "Process Instance Key",
        processName: "Process Name",
        taskState: "Task State"
      }
    },

    CamundaProcessDefinition: {
      name: "Process Definition |||| Process Definitions",

      fields: {
        key: 'Key',
        name: 'Name',
        bpmnProcessId: 'BPMN Process Id',
        resource: 'Resource'
      }
    },

    CamundaTaskFilter: {
      name: "Camunda Task Filter |||| Camunda Task Filters",

      fields: {
        id: 'id',
        name: 'Name',
        conditions: 'Conditions'
      }
    },

    ClaimOutputDto: {
      name: "Claim |||| Claims",

      fields: {
        description: "Description",

        policy: {
          id: "Policy"
        },

        timestamp: "Timestamp"
      }
    },

    PolicyOutputDto: {
      name: "Policy |||| Policies",

      fields: {
        caseDescription: "Case Description",
        insurancePremium: "Insurance Premium",
        insuranceSum: "Insurance Sum",
        name: "Name",

        policyType: {
          id: "Policy Type"
        },

        policyholder: {
          id: "Policy Holder"
        }
      }
    },

    PolicyholderDto: {
      name: "Policy Holder |||| Policy Holders",

      fields: {
        address: "Address",
        dateOfBirth: "Date Of Birth",
        name: "Name"
      }
    },

    PolicyTypeDto: {
      name: "Policy Type |||| Policy Types",

      fields: {
        description: "Description",
        name: "Name"
      }
    }
  },

  enums: {
    CamundaTaskState: {
      CANCELED: "Canceled",
      COMPLETED: "Completed",
      CREATED: "Created"
    },
    CamundaTaskConditionType: {
      PROCESS_DEFINITION_BPMN_PROCESS_ID: 'Process definition bpmn process id',
      PROCESS_DEFINITION_KEY: 'Process definition key',
      TASK_ASSIGNEE: 'Task assignee',
      TASK_CANDIDATE_GROUPS: 'Task candidate groups',
      TASK_CANDIDATE_USERS: 'Task candidate users',
      TASK_DEFINITION_KEY: 'Task definition key',
      TASK_DUE_DATE_AFTER: 'Task due date after',
      TASK_DUE_DATE_BEFORE: 'Task due date before',
      TASK_FOLLOW_UP_DATE_AFTER: 'Task follow up date after',
      TASK_FOLLOW_UP_DATE_BEFORE: 'Task follow up date before',
      TASK_STATE: 'Task state',
      UNASSIGNED_TASKS: 'Unassigned tasks',
    }
  },

  amplicode: {
    not_set: "Not set",
  },

  camunda: {
    startProcess: {
      startProcessButton: "Start Process",
      startProcessLabel: "Start Process",
      startProcessErrorMessage: "Error occurred while starting process",
      startProcessSuccessMessage: "Process has started successfully",
      startProcessVariableJson: "Variables json",
    },
    taskFilter: {
      condition: {
        addCondition: 'Add condition',
        removeCondition: 'Remove condition',
        valueExpression: 'Value expression',
        valueExpressionValidationError: 'Not FEEL grammar',
        values: 'Values',
        type: 'Type',
      }
    }
  }
};

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
