import russianMessages from "@haulmont/ra-language-russian";
import { TranslationMessages } from "ra-core";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
  ...russianMessages,
  resources: {
    CamundaTask: {
      name: "Пользовательская задача |||| Задачи пользователей",

      fields: {
        assignee: "Исполнитель",
        completionDate: "Дата завершения",
        creationDate: "Дата создания",
        dueDate: "Дата исполнения",
        followUpDate: "Дата оповещения",

        form: {
          id: "Форма"
        },

        formKey: "Ключ формы",
        name: "Наименование",
        processDefinitionKey: "Ключ описания процесса",
        processInstanceKey: "Ключ процесса",
        processName: "Процесс",
        taskState: "Состояние"
      }
    },
  },
  enums: {
    CamundaTaskState: {
      CANCELED: "Отменена",
      COMPLETED: "Завершена",
      CREATED: "Создана"
    },
  },
  camunda: {
      taskList: {
          open: "Открыть"
      },
      taskForm: {
        title: "Пользовательская задача %{taskName}",
        process: "Процесс",
        complete: {
          button: "Завершить"
        },
        taskDetails: "Информация о задаче"
      }
  }
};

export const ru = mergeMessages(
  messages,
  [] // place addon messages here
);
