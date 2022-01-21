import {observer} from "mobx-react";
import {ApolloCache, gql, Reference, useMutation, useQuery} from "@apollo/client";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, Card, Empty, Modal, Result, Spin} from "antd";
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {MutationFunctionOptions} from "@apollo/client/react/types/types";
import {FetchResult} from "@apollo/client/link/core";
import {useCallback, useEffect} from "react";
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
import {ClaimDetails} from "./ClaimDetails";

const ROUTE = "claim-list";

const CLAIMS = gql(/* GraphQL */ `
    query claims {
        claims {
            description
            id
            policy
            timestamp
        }
    }
`);

const DELETE__CLAIM = gql(/* GraphQL */ `
    mutation delete_Claim($id: Long!) {
        delete_Claim(id: $id)
    }
`);

export const ClaimList = observer(({onSelect}: EntityListScreenProps) => {
    const screens: Screens = useScreens();
    const intl = useIntl();
    const match = useRouteMatch<{ entityId: string }>(`/${ROUTE}/:entityId`);
    const history = useHistory();

    const {loading, error, data} = useQuery(CLAIMS);

    const [executeDeleteMutation] = useMutation(DELETE__CLAIM);

    // Entity list can work in select mode, which means that you can select an entity instance and it will be passed to onSelect callback.
    // This functionality is used in EntityLookupField.
    const isSelectMode = onSelect != null;

    const openEditor = useCallback(
        (id?: string) => {
            const params: OpenInBreadcrumbParams = {
                breadcrumbCaption: intl.formatMessage({id: "screen.ClaimDetails"}),
                component: ClaimDetails
            };
            if (id != null) {
                params.props = {id};
            }
            screens.openInBreadcrumb(params);
            // Append /id to existing url
            history.push(id ? `/${ROUTE}/${id}` : `/${ROUTE}/new`);
        },
        [screens, history, intl]
    );

    useEffect(() => {
        if (
            screens.activeTab?.breadcrumbs.length === 1 &&
            match?.params.entityId != null
        ) {
            openEditor(match.params.entityId);
        }
    }, [match, openEditor, screens]);

    useDefaultBrowserHotkeys();

    if (loading) {
        return <Spin/>;
    }

    if (error) {
        return (
            <Result
                status="error"
                title={<FormattedMessage id="common.requestFailed"/>}
            />
        );
    }

    const items = data?.claims;

    return (
        <div className="narrow-layout">
            {!isSelectMode && (
                <div style={{marginBottom: "12px"}}>
                    <Button
                        htmlType="button"
                        key="create"
                        title='intl.formatMessage({id: "common.create"})'
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={() => openEditor()}
                    >
            <span>
              <FormattedMessage id="common.create"/>
            </span>
                    </Button>
                </div>
            )}
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

            {items == null || items.length === 0 ? (
                <Empty/>
            ) : (
                items.map((e: any) => (
                    <Card
                        key={e["id"]}
                        title={"Claim #" + e["id"]}
                        style={{marginBottom: "12px"}}
                        actions={getCardActions({
                            screens,
                            entityInstance: e,
                            onSelect,
                            executeDeleteMutation,
                            intl,
                            openEditor
                        })}
                    >
                        <Fields entity={e}/>
                    </Card>
                ))
            )}
        </div>
    );
});

const fieldArray = ["policy", "description", "timestamp"];

const Fields = ({entity}: { entity: any }) => (
    <>
        {Object.keys(entity)
            .filter(p => (p !== "id" && p !== "description") && entity[p] != null)
            .sort((a, b) => fieldArray.indexOf(a) - fieldArray.indexOf(b))
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
    executeDeleteMutation: (
        options?: MutationFunctionOptions
    ) => Promise<FetchResult>;
    intl: IntlShape;
    openEditor: (id?: string) => void;
}

function getCardActions(input: CardActionsInput) {
    const {
        screens,
        entityInstance,
        onSelect,
        executeDeleteMutation,
        intl,
        openEditor
    } = input;

    if (onSelect == null) {
        return [
            <DeleteOutlined
                key="delete"
                title={intl.formatMessage({id: "common.remove"})}
                onClick={() => {
                    Modal.confirm({
                        content: intl.formatMessage({
                            id: "EntityListScreen.deleteConfirmation"
                        }),
                        okText: intl.formatMessage({id: "common.ok"}),
                        cancelText: intl.formatMessage({id: "common.cancel"}),
                        onOk: () => {
                            executeDeleteMutation({
                                variables: {
                                    id: entityInstance.id
                                },
                                update: getUpdateFn(entityInstance)
                            });
                        }
                    });
                }}
            />,
            <EditOutlined
                key="edit"
                title={intl.formatMessage({id: "common.edit"})}
                onClick={() => {
                    openEditor(entityInstance.id);
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

function getUpdateFn(e: any) {
    return (cache: ApolloCache<any>) => {
        cache.modify({
            fields: {
                claims(existingRefs, {readField}) {
                    return existingRefs.filter(
                        (ref: Reference) => e["id"] !== readField("id", ref)
                    );
                }
            }
        });
    };
}
