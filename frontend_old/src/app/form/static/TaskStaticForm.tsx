import {observer} from "mobx-react";
import {FormattedMessage, useIntl} from "react-intl";
import {useScreens} from "@amplicode/react-core";
import {useHistory} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {loadTaskFormVariablesForStaticForm, processError} from "../FormSupport";
import {Button, Card, Empty, Form, Input, message, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import "../../Form.css";

interface FormProp {
    id: string
    changeTriggerState: () => void
}

export const TaskStaticForm = observer(({id, changeTriggerState}: FormProp) => {

    const intl = useIntl();
    const screens = useScreens();
    const history = useHistory();

    const [initialValues, setInitialValues] = useState<any>();

    useEffect(() => {
        loadTaskFormVariablesForStaticForm(id)
            .then(result => setInitialValues(result))
            .catch(error => processError(error));

        // axios.get(`http://localhost:8080/engine-rest/task/${id}/deployed-form`)
        //     .then(response =>
        //         loadTaskFormVariables(response, id)
        //             .then(components => setComponents(components)))
        //     .catch(error => processError(error));
    }, [id]);

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

        axios.post(`http://localhost:8080/engine-rest/task/${id}/complete`, {
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
                {initialValues != null ?
                <Form labelCol={{span: 8}} wrapperCol={{span: 16}}
                      onFinish={handleSubmit}
                      onFinishFailed={handleSubmitFailed}
                      className="form-layout"
                    // layout="vertical"
                >

                    <Form.Item
                        name="to"
                        label="To"
                        initialValue={initialValues?.to}
                        style={{marginBottom: "12px"}}
                        extra="Email Recipient"
                        rules={[
                            {
                                required: true,
                                message: "Field \"To\" is required"
                            },
                            {
                                pattern: /^(.+)@(\S+)$/,    // simple pattern
                                message: "Value must be a valid email address"
                            }
                        ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="subject"
                        label="Subject"
                        initialValue={initialValues?.subject}
                        extra="Subject of the Email"
                        style={{marginBottom: "12px"}}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="text"
                        label="Text"
                        initialValue={initialValues?.text}
                        style={{marginBottom: "12px"}}
                        extra="Text of the Notification"
                        rules={[
                            {
                                required: true,
                                message: "Field \"Text\" is required"
                            },
                            {
                                max: 1024,
                                message: `Value exceeds the limit of 1024 symbols`
                            }
                        ]}
                    >
                        <TextArea rows={2}/>
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
                </Form> :
                <Empty/>}
            </Row>
        </Card>
    );
});