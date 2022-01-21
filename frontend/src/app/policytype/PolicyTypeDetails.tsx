import {useEffect, useCallback, useState} from "react";
import {
    useLazyQuery,
    useMutation,
    gql,
    FetchResult,
    ApolloError,
    ApolloCache
} from "@apollo/client";
import {Form, Button, Card, message, Alert, Spin, Result, Input, Row} from "antd";
import {useForm} from "antd/es/form/Form";
import {observer} from "mobx-react";
import {FormattedMessage, useIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {
    EntityDetailsScreenProps,
    useScreens,
    useDefaultEditorHotkeys
} from "@amplicode/react-core";
import TextArea from "antd/es/input/TextArea";

const POLICY_TYPE = gql(/* GraphQL */ `
    query policyType($id: Long!) {
        policyType(id: $id) {
            description
            id
            name
        }
    }
`);

const UPSERT__POLICY_TYPE = gql(/* GraphQL */ `
    mutation upsert_PolicyType($dto: PolicyTypeDtoInput) {
        upsert_PolicyType(dto: $dto) {
            description
            id
            name
        }
    }
`);

export const PolicyTypeDetails = observer(
    ({id}: EntityDetailsScreenProps) => {
        const [form] = useForm();
        const intl = useIntl();
        const screens = useScreens();
        const history = useHistory();

        const [
            loadItem,
            {loading: queryLoading, error: queryError, data}
        ] = useLazyQuery(POLICY_TYPE, {
            variables: {
                id
            }
        });

        const [executeUpsertMutation, {loading: upsertInProcess}] = useMutation(
            UPSERT__POLICY_TYPE
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

        const item = data?.policyType;

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

                        <Form.Item name="name" label="Name" style={{marginBottom: "12px"}}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Field \"Name\" is mandatory"
                                       }
                                   ]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            style={{marginBottom: "12px"}}
                        >
                            <TextArea rows={2} maxLength={1024}/>
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
        );
    }
);

function formValuesToData(values: any, id?: string): any {
    return {
        ...values,
        id
    };
}

function dataToFormValues(data: any): any {
    return data;
}

function getUpdateFn(values: any) {
    return (cache: ApolloCache<any>, result: FetchResult) => {
        const updateResult = result.data?.upsert_PolicyType;
        // Reflect the update in Apollo cache
        cache.modify({
            fields: {
                policyTypes(existingRefs = []) {
                    const updatedItemRef = cache.writeFragment({
                        id: `PolicyTypeDto:${updateResult.id}`,
                        data: values,
                        fragment: gql(`
              fragment New_PolicyTypeDto on PolicyTypeDto {
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
