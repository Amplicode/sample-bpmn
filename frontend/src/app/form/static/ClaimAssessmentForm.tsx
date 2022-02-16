import {observer} from "mobx-react";
import {Button, Card, Checkbox, Form, message, Row} from "antd";
import {processError} from "../FormSupport";
import {FormattedMessage, useIntl} from "react-intl";
import "../../Form.css";
import axios from "axios";
import {useScreens} from "@amplicode/react-core";
import {useHistory} from "react-router-dom";
import {useCallback} from "react";

interface FormProp {
    id: string
    changeTriggerState: () => void
}

export const ClaimAssessmentForm = observer(({id, changeTriggerState}: FormProp) => {

    const intl = useIntl();
    const screens = useScreens();
    const history = useHistory();

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
                <Form
                    labelCol={{span: 8}} wrapperCol={{span: 16}}
                    // layout="vertical"
                    className="form-layout"
                    onFinish={handleSubmit}
                    onFinishFailed={handleSubmitFailed}
                >
                    <Form.Item style={{textAlign: "center"}} name="isClaimAccepted" valuePropName="checked"
                               label="Is Claim accepted?">
                            <Checkbox/>
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}
                               wrapperCol={{span: 12, offset: 8}}
                    >
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
})