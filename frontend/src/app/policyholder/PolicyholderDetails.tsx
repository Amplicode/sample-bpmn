import {useCallback, useEffect, useState} from "react";
import {ApolloCache, ApolloError, FetchResult, gql, useLazyQuery, useMutation} from "@apollo/client";
import {Alert, Button, Card, DatePicker, Form, Input, message, Result, Row, Spin} from "antd";
import {useForm} from "antd/es/form/Form";
import {observer} from "mobx-react";
import {FormattedMessage, useIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {EntityDetailsScreenProps, useDefaultEditorHotkeys, useScreens} from "@amplicode/react-core";

import "../Details.css";
import moment from "moment";

interface Policyholder {
    id?: string
    name: string
    dateOfBirth: string
    address?: string
}

const POLICYHOLDER = gql(/* GraphQL */ `
    query policyholder($id: Long!) {
        policyholder(id: $id) {
            address
            dateOfBirth
            id
            name
        }
    }
`);

const UPSERT__POLICYHOLDER = gql(/* GraphQL */ `
    mutation upsert_Policyholder($dto: PolicyholderDtoInput) {
        upsert_Policyholder(dto: $dto) {
            address
            dateOfBirth
            id
            name
        }
    }
`);

export const PolicyholderDetails = observer(({id}: EntityDetailsScreenProps) => {
    const [form] = useForm();
    const intl = useIntl();
    const screens = useScreens();
    const history = useHistory();

    const [
        loadItem,
        {loading: queryLoading, error: queryError, data}
    ] = useLazyQuery(POLICYHOLDER, {
        variables: {
            id
        }
    });

    const [executeUpsertMutation, {loading: upsertInProcess}] = useMutation(
        UPSERT__POLICYHOLDER
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

    const handleSubmitFailed = useCallback((values) => {
        message.error(
            intl.formatMessage({id: "EntityDetailsScreen.validationError"})
        );
    }, [intl]);

    useEffect(() => {
        if (id != null) {
            loadItem();
        }
    }, [loadItem, id]);

    const item: Policyholder = data?.policyholder;

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
                    form={form}
                    className={"form-layout"}
                >
                    <Form.Item name="name" label="Name"
                               rules={[
                                   {
                                       required: true,
                                       message: "Field \"Name\" is mandatory"
                                   }
                               ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="dateOfBirth"
                        label="Date of Birth"
                        style={{marginBottom: "12px"}}
                        rules={[
                            {
                                required: true,
                                message: "Field \"Date of Birth\" is mandatory"
                            }
                        ]}
                    >
                        <DatePicker format={"DD/MM/YYYY"} style={{width: "80%"}}/>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        style={{marginBottom: "12px"}}
                    >
                        <Input/>
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
});

function formValuesToData(values: any, id?: string): any {
    return {
        ...values,
        id
    };
}

function dataToFormValues(item: Policyholder): any {
    const {dateOfBirth, ...filteredItem} = item;
    return {dateOfBirth: moment(dateOfBirth, "DD/MM/YYYY"), ...filteredItem};
}

function getUpdateFn(values: any) {
    return (cache: ApolloCache<any>, result: FetchResult) => {
        const updateResult = result.data?.upsert_Policyholder;
        // Reflect the update in Apollo cache
        cache.modify({
            fields: {
                policyholders(existingRefs = []) {
                    const updatedItemRef = cache.writeFragment({
                        id: `PolicyholderDto:${updateResult.id}`,
                        data: values,
                        fragment: gql(`
              fragment New_PolicyholderDto on PolicyholderDto {
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
