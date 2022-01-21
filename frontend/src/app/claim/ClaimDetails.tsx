import {useCallback, useEffect, useState} from "react";
import {ApolloCache, ApolloError, FetchResult, gql, useLazyQuery, useMutation} from "@apollo/client";
import {Alert, Button, Card, DatePicker, Form, message, Result, Row, Select, Spin} from "antd";
import {useForm} from "antd/es/form/Form";
import {observer} from "mobx-react";
import {FormattedMessage, useIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {EntityDetailsScreenProps, useDefaultEditorHotkeys, useScreens} from "@amplicode/react-core";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

interface Claim {
    id?: string
    policy: string | number
    description?: string
    timestamp: string
}

const {Option} = Select;

const CLAIM = gql(/* GraphQL */ `
    query claim($id: Long!) {
        claim(id: $id) {
            id
            policy
            timestamp
            description
        }
    }
`);

const POLICIES = gql(/* GraphQL */ `
    query policies {
        policies {
            id
            name
        }
    }
`);

const UPSERT__CLAIM = gql(/* GraphQL */ `
    mutation upsert_Claim($dto: ClaimInputDtoInput) {
        upsert_Claim(dto: $dto) {
            description
            id
            timestamp
        }
    }
`);

export const ClaimDetails = observer(({id}: EntityDetailsScreenProps) => {
    const [form] = useForm();
    const intl = useIntl();
    const screens = useScreens();
    const history = useHistory();

    const [
        loadItem,
        {loading: queryLoading, error: queryError, data}
    ] = useLazyQuery(CLAIM, {
        variables: {
            id
        }
    });

    const [
        loadPolicies,
        {loading: policiesQueryLoading, error: policiesQueryError, data: policiesData}
    ] = useLazyQuery(POLICIES);

    const [executeUpsertMutation, {loading: upsertInProcess}] = useMutation(
        UPSERT__CLAIM
    );

    const [formError, setFormError] = useState<string | undefined>();

    const goToParentScreen = useCallback(() => {
        history.push("."); // Remove entity id part from url
        screens.closeActiveBreadcrumb();
    }, [screens, history]);

    const handleSubmit = useCallback(
        values => {
            executeUpsertMutation({
                variables: {
                    dto: formValuesToData(values, id)
                },
                update: getUpdateFn(values)
            })
                .then(({errors}: FetchResult) => {
                    if (errors == null || errors.length === 0) {
                        goToParentScreen();
                        message.success(
                            intl.formatMessage({
                                id: "EntityDetailsScreen.savedSuccessfully"
                            })
                        );
                        return;
                    }
                    setFormError(errors.join("\n"));
                    console.error(errors);
                    message.error(intl.formatMessage({id: "common.requestFailed"}));
                })
                .catch((e: Error | ApolloError) => {
                    setFormError(e.message);
                    console.error(e);
                    message.error(intl.formatMessage({id: "common.requestFailed"}));
                });
        },
        [executeUpsertMutation, id, intl, goToParentScreen]
    );

    const handleSubmitFailed = useCallback(() => {
        message.error(
            intl.formatMessage({id: "EntityDetailsScreen.validationError"})
        );
    }, [intl]);

    useEffect(() => {
        if (id != null) {
            loadItem();
        }
    }, [loadItem, id]);

    const item = data?.claim;

    useEffect(() => {
        loadPolicies();
    }, [loadPolicies, id]);

    const policies = policiesData?.policies;

    useEffect(() => {
        if (item != null) {
            form.setFieldsValue(dataToFormValues(item));
        }
    }, [item, form]);

    useDefaultEditorHotkeys({saveEntity: form.submit});

    if (queryLoading) {
        return <Spin/>;
    }

    if (queryError) {
        return (
            <Result
                status="error"
                title={<FormattedMessage id="common.requestFailed"/>}
            />
        );
    }

    return (
        <Card className="narrow-layout">
            <Row justify="center">
                <Form
                    onFinish={handleSubmit}
                    onFinishFailed={handleSubmitFailed}
                    layout="vertical"
                    className="form-layout"
                    form={form}
                >

                    <Form.Item name="policy"
                               label="Policy"
                               style={{marginBottom: "12px"}}
                               rules={[
                                   {
                                       required: true,
                                       message: "Field \"Policy\" is mandatory"
                                   }
                               ]}
                    >
                        <Select loading={policiesQueryLoading}>
                            {policies?.map((policy: any) => {
                                return <Option value={policy["id"]} key={policy["id"]}>
                                    {policy["name"]}
                                </Option>
                            })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        style={{marginBottom: "12px"}}
                    >
                        <TextArea rows={2}/>
                    </Form.Item>

                    <Form.Item
                        name="timestamp"
                        label="Timestamp"
                        style={{marginBottom: "12px"}}
                        rules={[
                            {
                                required: true,
                                message: "Field \"Timestamp\" is mandatory"
                            }
                        ]}
                    >
                        <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime/>
                    </Form.Item>

                    {formError && (
                        <Alert
                            message={formError}
                            type="error"
                            style={{marginBottom: "18px"}}
                        />
                    )}

                    <Form.Item style={{textAlign: "center"}}>
                        <Button htmlType="button" onClick={goToParentScreen}>
                            <FormattedMessage id="common.cancel"/>
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={upsertInProcess}
                            style={{marginLeft: "8px"}}
                        >
                            <FormattedMessage id={"common.submit"}/>
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </Card>
    )
        ;
});

function formValuesToData(values: any, id?: string): any {
    return {
        ...values,
        id
    };
}

function dataToFormValues(item: Claim): any {
    const {timestamp, ...filteredItem} = item;
    return {timestamp: moment(timestamp, "DD/MM/YYYY HH:mm:ss"), ...filteredItem};
}

function getUpdateFn(values: any) {
    return (cache: ApolloCache<any>, result: FetchResult) => {
        const updateResult = result.data?.upsert_Claim;
        // Reflect the update in Apollo cache
        cache.modify({
            fields: {
                claims(existingRefs = []) {
                    const updatedItemRef = cache.writeFragment({
                        id: `ClaimOutputDto:${updateResult.id}`,
                        data: values,
                        fragment: gql(`
              fragment New_ClaimOutputDto on ClaimOutputDto {
                id
              }
            `)
                    });
                    return [...existingRefs, updatedItemRef];
                }
            }
        });
    };
}
