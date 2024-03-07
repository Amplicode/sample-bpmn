import russianMessages from "@haulmont/ra-language-russian";
import {TranslationMessages} from "ra-core";
import {mergeMessages} from "./mergeMessages";

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

    CamundaTaskFilter: {
      name: "Фильтр задач |||| Фильтры задач",

      fields: {
        id: 'ID',
        name: 'Наименование',
        isDefault: 'Использовать по умолчанию',
        conditions: 'Условия'
      }
    },
  },
  enums: {
    CamundaTaskState: {
      CANCELED: "Отменена",
      COMPLETED: "Завершена",
      CREATED: "Создана"
    },
    CamundaTaskConditionType: {
      TASK_ASSIGNEE: 'Исполнитель задачи',
      TASK_STATE: 'Статус задачи',
    }
  },
  camunda: {
    taskList: {
      filter: "Фильтр",
      open: "Открыть"
    },
    taskFilter: {
      condition: {
        addCondition: 'Добавить условие',
        removeCondition: 'Удалить условие',
        valueExpression: 'Выражение значения',
        values: 'Значения',
        type: 'Тип',
      }
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
