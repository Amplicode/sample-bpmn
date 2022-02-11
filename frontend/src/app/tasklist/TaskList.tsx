import {observer} from "mobx-react";
import {CheckOutlined, CloseOutlined, EnterOutlined} from "@ant-design/icons";
import {Button, Card, Empty, message} from "antd";
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {useCallback, useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {
    EntityListScreenProps,
    guessDisplayName,
    guessLabel, OpenInBreadcrumbParams,
    Screens,
    useDefaultBrowserHotkeys,
    useScreens
} from "@amplicode/react-core";
import axios, {AxiosResponse} from "axios";
import {TaskForm} from "../form/TaskForm";
import {StartEventForm} from "../form/StartEventForm";

const ROUTE = "task-list";

export const TaskList = observer(({onSelect}: EntityListScreenProps) => {
            const screens: Screens = useScreens();
            const intl = useIntl();

            // const [id, setId] = useState<string | undefined>();
            // const [key, setKey] = useState<string | undefined>();

            const userTaskMatch = useRouteMatch<{ id: string }>(`/${ROUTE}/user-task-id#:id`);
            const startEventMatch = useRouteMatch<{ processDefinitionKey: string }>(
                `/${ROUTE}/process-definition-key#:processDefinitionKey`);
            const history = useHistory();

            // Entity list can work in select mode, which means that you can select an entity instance and it will be passed to onSelect callback.
            // This functionality is used in EntityLookupField.
            const isSelectMode = onSelect != null;

            const openTaskForm = useCallback(
                (id: string) => {
                    const params: OpenInBreadcrumbParams = {
                        breadcrumbCaption: "Task Execution",
                        component: TaskForm,
                        props: {
                            id: id,
                            changeTriggerState: changeTriggerState
                        }
                    };

                    screens.openInBreadcrumb(params);
                    // Append /id to existing url
                    history.push(`/${ROUTE}/user-task-id#${id}`);
                },
                [screens, history, intl]
            );

            const openStartEventForm = useCallback(
                (key: string) => {
                    const params: OpenInBreadcrumbParams = {
                        breadcrumbCaption: "Start Event Form",
                        component: StartEventForm,
                        props: {
                            processDefinitionKey: key,
                            changeTriggerState: changeTriggerState
                        }
                    };

                    screens.openInBreadcrumb(params);

                    history.push(`/${ROUTE}/process-definition-key#${key}`);
                },
                [screens, history, intl]
            );

            const [tasks, setTasks] = useState<Array<any>>([]);

            let names: any[] = [];

            const [taskListLoadingTrigger, setTaskListLoadingTrigger] = useState(true);

            useEffect(() => {
                axios.get<Array<any>>("http://localhost:8080/engine-rest/task")
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

            const changeTriggerState = () => {
                setTaskListLoadingTrigger(taskListLoadingTrigger => !taskListLoadingTrigger);
            };


            useEffect(() => {
                if (
                    screens.activeTab?.breadcrumbs.length === 1 &&
                    userTaskMatch?.params.id != null
                ) {
                    openTaskForm(userTaskMatch.params.id);
                }
            }, [userTaskMatch, openTaskForm, screens]);

            useEffect(() => {
                if (
                    screens.activeTab?.breadcrumbs.length === 1 &&
                    startEventMatch?.params.processDefinitionKey != null
                ) {
                    openStartEventForm(startEventMatch.params.processDefinitionKey);
                }
            }, [startEventMatch, openStartEventForm, screens]);

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

                    <div style={{marginBottom: "12px"}}>
                        <Button type="primary" onClick={() => openStartEventForm("InsuranceClaimProcessing")}>
                            Start Process Instance
                        </Button>
                    </div>

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
                                        openTaskForm
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
    openTaskForm: (id: string) => void;
}

function getCardActions(input: CardActionsInput) {
    const {screens, entityInstance, onSelect, intl, openTaskForm} = input;

    if (onSelect == null) {
        return [
            <EnterOutlined
                key="details"
                title={intl.formatMessage({id: "common.viewDetails"})}
                onClick={() => {
                    openTaskForm(entityInstance.id);
                }}
            />
        ];
    }

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