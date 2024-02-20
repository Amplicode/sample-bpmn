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
      name: "Process Definition |||| Processes Definition",

      fields: {
        key: 'Key',
        name: 'Name',
        bpmnProcessId: 'BPMN Process Id',
        resource: 'Resource'
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
      name: "Policy |||| Policies ",

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
    }
  },

  amplicode: {
    not_set: "Not set",
  },

  camunda: {
    startProcess: {
      startProcessButton: "Start Process",
      startProcessLabel: "Start Process",
      startProcessErrorMessage: "Error occurred while starting camunda process",
      startProcessSuccessMessage: "Camunda process has started successfully",
      startProcessVariableJson: "Variables json",
    }    
  }
};

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
