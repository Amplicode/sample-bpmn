import {useEffect, useCallback, useState} from "react";
import {
    useLazyQuery,
    useMutation,
    gql,
    FetchResult,
    ApolloError,
    ApolloCache
} from "@apollo/client";
import {Form, Button, Card, message, Alert, Spin, Result, Input, Select, Row} from "antd";
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

interface Policy {

}

const {Option} = Select;

const POLICY = gql(/* GraphQL */ `
    query policy($id: Long!) {
        policy(id: $id) {
            caseDescription
            id
            insurancePremium
            insuranceSum
            name
            policyType
            policyholder
        }
    }
`);

const POLICYHOLDERS = gql(/* GraphQL */ `
    query policyholders {
        policyholders {
            id
            name
        }
    }
`);

const POLICY__TYPES = gql(/* GraphQL */ `
    query policyTypes {
        policyTypes {
            id
            name
        }
    }
`);

const UPSERT__POLICY = gql(/* GraphQL */ `
    mutation upsert_Policy($dto: PolicyInputDtoInput) {
        upsert_Policy(dto: $dto) {
            caseDescription
            id
            insurancePremium
            insuranceSum
            name
            policyholder
            policyType
        }
    }
`);

export const PolicyDetails = observer(({id}: EntityDetailsScreenProps) => {
    const [form] = useForm();
    const intl = useIntl();
    const screens = useScreens();
    const history = useHistory();

    const [
        loadItem,
        {loading: queryLoading, error: queryError, data}
    ] = useLazyQuery(POLICY, {
        variables: {
            id
        }
    });

    const [
        loadPolicyholders,
        {loading: policyholdersQueryLoading, error: policyholdersQueryError, data: policyholdersData}
    ] = useLazyQuery(POLICYHOLDERS);

    const [
        loadPolicyTypes,
        {loading: policyTypesQueryLoading, error: policyTypesQueryError, data: policyTypesData}
    ] = useLazyQuery(POLICY__TYPES);

    const [executeUpsertMutation, {loading: upsertInProcess}] = useMutation(
        UPSERT__POLICY
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

    const item = data?.policy;

    useEffect(() => {
        if (id == null) {
            loadPolicyholders();
        }
    }, [loadPolicyholders, id]);

    const policyholders = policyholdersData?.policyholders;

    useEffect(() => {
        loadPolicyTypes();
    }, [loadPolicyTypes, id]);

    const policyTypes = policyTypesData?.policyTypes;

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
                    style={{width: "80%"}}
                    form={form}
                >

                    <Form.Item
                        name="policyholder"
                        label="Policyholder"
                        style={{marginBottom: "12px"}}
                        rules={[
                            {
                                required: true,
                                message: "Field \"Policyholder\" is mandatory"
                            }
                        ]}>
                        <Select loading={policyholdersQueryLoading}
                                disabled={item}>
                            {policyholders?.map((policyholder: any) => {
                                return <Option value={policyholder["id"]} key={policyholder["id"]}>
                                    {policyholder["name"]}
                                </Option>
                            })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="policyType"
                        label="Policy Type"
                        style={{marginBottom: "12px"}}
                        rules={[
                            {
                                required: true,
                                message: "Field \"Policy Type\" is mandatory"
                            }
                        ]}>
                        <Select loading={policyTypesQueryLoading}>
                            {policyTypes?.map((policyType: any) => {
                                return <Option value={policyType["id"]} key={policyType["id"]}>
                                    {policyType["name"]}
                                </Option>
                            })
                            }
                        </Select>
                    </Form.Item>

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
                        name="insurancePremium"
                        label="Insurance Premium"
                        style={{marginBottom: "12px"}}
                        rules={[
                            {
                                required: true,
                                message: "Field \"Insurance Premium\" is mandatory"
                            },
                            {
                                pattern: /^\d{1,17}(\.\d{1,2})?$/,  //perhaps it should be corrected and
                                message: "Insurance Premium must be a valid number",
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="insuranceSum"
                        label="Insurance Sum"
                        style={{marginBottom: "12px"}}
                        rules={[
                            {
                                required: true,
                                message: "Field \"Insurance Sum\" is mandatory"
                            },
                            {
                                pattern: /^\d{1,17}(\.\d{1,2})?$/,
                                message: "Insurance Sum must be a valid number"
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="caseDescription"
                        label="Case Description"
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
});

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
        const updateResult = result.data?.upsert_Policy;
        // Reflect the update in Apollo cache
        cache.modify({
            fields: {
                policies(existingRefs = []) {
                    const updatedItemRef = cache.writeFragment({
                        id: `PolicyOutputDto:${updateResult.id}`,
                        data: values,
                        fragment: gql(`
              fragment New_PolicyOutputDto on PolicyOutputDto {
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
