import {Button, Card, Form, message, Row, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {FormattedMessage, useIntl} from "react-intl";
import {observer} from "mobx-react";
import {gql, useQuery} from "@apollo/client";
import {useCallback} from "react";
import axios from "axios";
import {processError} from "../FormSupport";
import {useScreens} from "@amplicode/react-core";
import {useHistory} from "react-router-dom";
import "../../Form.css";

const {Option} = Select;

const POLICYHOLDERS = gql(/* GraphQL */ `
    query policyholdersList {
        policyholders {
            id
            name
        }
    }
`);

const POLICIES = gql(/* GraphQL */ `
    query policiesList {
        policies {
            id
            name
        }
    }
`);

interface StartEventFormProp {
    processDefinitionKey: string
    changeTriggerState: () => void
}

export const StartEventStaticForm = observer(({processDefinitionKey, changeTriggerState}: StartEventFormProp) => {

    const intl = useIntl();
    const screens = useScreens();
    const history = useHistory();

    const {
        loading: policyholderQueryLoading,
        error: policyholderQueryError,
        data: policyholderData
    } = useQuery<{ policyholders: any[] }>(POLICYHOLDERS);

    const policyholders = policyholderData?.policyholders;

    const {
        loading: policyQueryLoading,
        error: policyQueryError,
        data: policyData
    } = useQuery<{ policies: any[] }>(POLICIES);

    const policies = policyData?.policies;

    const goToParentScreen = useCallback(() => {
        history.push("."); // Remove task id part from url
        screens.closeActiveBreadcrumb();
    }, [screens, history]);

    function handleSubmit(values: any) {
        const formEntries = Object.entries(values);

        const variablesObject: any = {};

        for (const [key, value] of formEntries) {
            variablesObject[key] = {value: value};
        }

        axios.post(`http://localhost:8080/engine-rest/process-definition/key/${processDefinitionKey}/submit-form`, {
            variables: variablesObject
        })
            .then(() => changeTriggerState())
            .then(() => goToParentScreen())
            .catch(error => processError(error));
    }

    const handleSubmitFailed = useCallback(() => {
        message.error(
            "Form Submission failed"
        );
    }, [intl]);

    return (
        <Card className="narrow-layout">
            <Row justify="center">
                <Form
                    labelCol={{span: 8}} wrapperCol={{span: 16}}
                    onFinish={handleSubmit}
                    onFinishFailed={handleSubmitFailed}
                    // layout="vertical"
                    className="form-layout"
                >

                    <Form.Item labelCol={{span: 8}} wrapperCol={{span: 16}}
                        name="policyholderId"
                        label="Policyholder"
                        style={{marginBottom: "12px"}}
                        extra="Your ID in the Insurance system"
                        rules={[
                            {
                                required: true,
                                message: "Field \"Policyholder\" is required"
                            },
                            {
                                pattern: /^\d{1,19}$/,
                                message: "Policyholder ID must be a positive Long number"
                            }
                        ]}>
                        <Select loading={policyholderQueryLoading}>
                            {policyholders?.map((policyholder: any) => {
                                return <Option value={policyholder["id"].toString()} key={policyholder["id"]}>
                                    {policyholder["name"]}
                                </Option>
                            })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="policyId"
                        label="Policy"
                        style={{marginBottom: "12px"}}
                        extra="Your Policy ID"
                        rules={[
                            {
                                required: true,
                                message: "Field \"Policy\" is required"
                            },
                            {
                                pattern: /^\d{1,19}$/,
                                message: "Policy ID must be a positive Long number"
                            }
                        ]}>
                        <Select loading={policyQueryLoading}>
                            {policies?.map((policy: any) => {
                                return <Option value={policy["id"].toString()} key={policy["id"]}>
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
                        extra="Claim Description"
                    >
                        <TextArea rows={2} maxLength={1024}/>
                    </Form.Item>

                    <Form.Item style={{textAlign: "center"}} wrapperCol={{span: 12, offset: 8}}>
                        <Button htmlType="button" onClick={goToParentScreen}>
                            <FormattedMessage id="common.cancel"/>
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            // loading={upsertInProcess}
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