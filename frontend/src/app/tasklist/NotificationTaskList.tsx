import {observer} from "mobx-react";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {Button, Card, Empty, message} from "antd";
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {useCallback, useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {
    EntityListScreenProps,
    guessDisplayName,
    guessLabel,
    OpenInBreadcrumbParams,
    Screens,
    useDefaultBrowserHotkeys,
    useScreens
} from "@amplicode/react-core";
import axios, {AxiosResponse} from "axios";
import {StartEventStaticForm} from "../form/static/StartEventStaticForm";
import {StartEventDynamicForm} from "../form/dynamic/StartEventDynamicForm";
import {TaskDynamicForm} from "../form/dynamic/TaskDynamicForm";
import {TaskStaticForm} from "../form/static/TaskStaticForm";

const ROUTE = "notification-task-list";

export const NotificationTaskList = observer(({onSelect}: EntityListScreenProps) => {
            const screens: Screens = useScreens();
            const intl = useIntl();

            // const [id, setId] = useState<string | undefined>();
            // const [key, setKey] = useState<string | undefined>();

            const userTaskDynamicMatch = useRouteMatch<{ id: string }>(`/${ROUTE}/dynamic/user-task-id#:id`);
            const userTaskStaticMatch = useRouteMatch<{ id: string }>(`/${ROUTE}/static/user-task-id#:id`);

            const history = useHistory();

            // Entity list can work in select mode, which means that you can select an entity instance and it will be passed to onSelect callback.
            // This functionality is used in EntityLookupField.
            const isSelectMode = onSelect != null;

            const openTaskDynamicForm = useCallback(
                (id: string) => {
                    const params: OpenInBreadcrumbParams = {
                        breadcrumbCaption: "Task Execution (Dynamic Form)",
                        component: TaskDynamicForm,
                        props: {
                            id: id,
                            changeTriggerState: changeTriggerState
                        }
                    };

                    screens.openInBreadcrumb(params);
                    history.push(`/${ROUTE}/dynamic/user-task-id#${id}`);
                },
                [screens, history, intl]
            );

            const openTaskStaticForm = useCallback(
                (id: string) => {
                    const params: OpenInBreadcrumbParams = {
                        breadcrumbCaption: "Task Execution (Static Form)",
                        component: TaskStaticForm,
                        props: {
                            id: id,
                            changeTriggerState: changeTriggerState
                        }
                    };

                    screens.openInBreadcrumb(params);
                    history.push(`/${ROUTE}/static/user-task-id#${id}`);
                },
                [screens, history, intl]
            );

            const [tasks, setTasks] = useState<Array<any>>([]);

            let names: any[] = [];

            const [taskListLoadingTrigger, setTaskListLoadingTrigger] = useState(true);

            const changeTriggerState = () => {
                setTaskListLoadingTrigger(taskListLoadingTrigger => !taskListLoadingTrigger);
            };

            useEffect(() => {
                axios.get<Array<any>>("http://localhost:8080/engine-rest/task",
                    {
                        params: {
                            assignee: "notifier"
                        }
                    })
                    .then(taskResponse => {
                        return filterTaskResponse(taskResponse);
                    })
                    .then((filteredResponse) => {
                        const processDefinitionPromises = filteredResponse.map(task => {
                                const {processDefinitionId} = task;

                                return getProcessDefinition(processDefinitionId);
                            }
                        );

                        Promise.all(processDefinitionPromises)
                            .then(processDefinitionNames => names = processDefinitionNames)
                            .then(() => {
                                return filteredResponse.map(task => {
                                    const {processDefinitionId, ...properties} = task;
                                    return {processDefinitionName: names.shift(), ...properties};
                                });
                            })
                            .then(tasks => setTasks(tasks))
                            .catch(error => processError(error));
                    })
                    .catch(error => processError(error));

            }, [taskListLoadingTrigger]);

            useEffect(() => {
                if (
                    screens.activeTab?.breadcrumbs.length === 1 &&
                    userTaskDynamicMatch?.params.id != null
                ) {
                    openTaskDynamicForm(userTaskDynamicMatch.params.id);
                }
            }, [userTaskDynamicMatch, openTaskDynamicForm, screens]);

            useEffect(() => {
                if (
                    screens.activeTab?.breadcrumbs.length === 1 &&
                    userTaskStaticMatch?.params.id != null
                ) {
                    openTaskDynamicForm(userTaskStaticMatch.params.id);
                }
            }, [userTaskStaticMatch, openTaskStaticForm, screens]);

            useDefaultBrowserHotkeys();

            return (
                <div className="narrow-layout">
                    {isSelectMode && (
                        <div style={{marginBottom: "12px"}}>
                            <Button
                                htmlType="button"
                                key="close"
                                title='intl.formatMessage({id: "common.close"})'
                                type="primary"
                                icon={<CloseOutlined/>}
                                onClick={screens.closeActiveBreadcrumb}
                            >
            <span>
              <FormattedMessage id="common.close"/>
            </span>
                            </Button>
                        </div>
                    )}

                    {tasks == null || tasks.length === 0 ? (
                        <Empty/>
                    ) : (
                        tasks.sort((a: any, b: any) => a.name.localeCompare(b.name))
                            .map((e: any) => (
                                <Card
                                    key={e["id"]}
                                    title={guessDisplayName(e)}
                                    style={{marginBottom: "12px"}}
                                    actions={getCardActions({
                                        screens,
                                        entityInstance: e,
                                        onSelect,
                                        intl,
                                        openTaskDynamicForm,
                                        openTaskStaticForm
                                    })}
                                >
                                    <Fields entity={e}/>
                                </Card>
                            ))
                    )}
                </div>
            );
        }
    )
;

const Fields = ({entity}: { entity: any }) => (
    <>
        {Object.keys(entity)
            .filter(p => p !== "id" && entity[p] != null)
            .map(p => (
                <div key={p}>
                    <strong>{guessLabel(p)}:</strong> {renderFieldValue(entity, p)}
                </div>
            ))}
    </>
);

function renderFieldValue(entity: any, property: string): string {
    return typeof entity[property] === "object"
        ? guessDisplayName(entity[property])
        : String(entity[property]);
}

interface CardActionsInput {
    screens: Screens;
    entityInstance: any;
    onSelect?: (entityInstance: this["entityInstance"]) => void;
    intl: IntlShape;
    openTaskDynamicForm: (id: string) => void;
    openTaskStaticForm: (id: string) => void;
}

function getCardActions(input: CardActionsInput) {
    const {screens, entityInstance, onSelect, intl, openTaskDynamicForm, openTaskStaticForm} = input;

    if (onSelect == null) {
        // <EnterOutlined
        //     key="details"
        //     title={intl.formatMessage({id: "common.viewDetails"})}
        //     onClick={() => {
        //         openTaskForm(entityInstance.id);
        //     }}
        // />
        return [
            <Button key="dynamicTask"
                    title=""
                    style={{color: "blue"}}
                    onClick={() => {
                        openTaskDynamicForm(entityInstance.id);
                    }}
            >
                Dynamic Task Form
            </Button>,
            <Button key="staticTask"
                    style={{color: "red"}}
                    onClick={() => {
                        openTaskStaticForm(entityInstance.id);
                    }}
            >
                Static Task Form
            </Button>
        ]

        if (onSelect != null) {
            return [
                <CheckOutlined
                    key="select"
                    title={intl.formatMessage({
                        id: "EntityLookupField.selectEntityInstance"
                    })}
                    onClick={() => {
                        if (onSelect != null) {
                            onSelect(entityInstance);
                            screens.closeActiveBreadcrumb();
                        }
                    }}
                />
            ];
        }
    }
}

// todo: must be in a separate module
function processError(error: Error) {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            let errorText = error.response.statusText + ": status is " + error.response.status + "\n";
            console.error(errorText);
            message.error(error.message);
        } else if (error.request) {
            console.error("Error Request: " + error.request);
            message.error("Error Message: " + error.message);
        }
    } else {
        message.error(error.message);
    }
}

function getProcessDefinition(id: string) {
    return axios.get(`http://localhost:8080/engine-rest/process-definition/${id}`)
        .then((response) => {
            return response.data.name;
        })
        .catch(error => processError(error));
}

function filterTaskProperties(task: any) {
    const {id, name, assignee, created, processDefinitionId, priority} = task;

    return {
        id,
        name,
        assignee,
        created,
        processDefinitionId,
        priority
    };
}

function filterTaskResponse(taskResponse: AxiosResponse<Array<any>>) {
    return taskResponse.data
        .map(task => filterTaskProperties(task));
}