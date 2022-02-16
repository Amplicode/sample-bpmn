import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Empty, Form, Row} from "antd";
import {Screens, useScreens} from "@amplicode/react-core";
import {useHistory} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {loadTaskFormVariables, parseComponent, processError} from "../FormSupport";
import "../../Form.css";
import {observer} from "mobx-react";

interface FormProp {
    id: string
    changeTriggerState: () => void
}

export const TaskDynamicForm = observer(({id, changeTriggerState}: FormProp) => {

    const screens: Screens = useScreens();
    const history = useHistory();

    const goToParentScreen = useCallback(() => {
        history.push("."); // Remove entity id part from url
        screens.closeActiveBreadcrumb();
    }, [screens, history]);


    const [components, setComponents] = useState<Array<any>>([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/engine-rest/task/${id}/deployed-form`)
            .then(response =>
                loadTaskFormVariables(response, id)
                    .then(components => setComponents(components)))
            .catch(error => processError(error));
    }, [id]);

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

    return (
        <Card className="narrow-layout">
            <Row justify="center">
                {components != null && components.length !== 0 ?
                    <Form labelCol={{span: 8}} wrapperCol={{span: 16}}
                        // layout="vertical"
                          className="form-layout"
                          onFinish={handleSubmit}
                    >
                        {components.map(component => parseComponent(component))}
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
                    <Empty/>
                }
            </Row>
        </Card>
    );
});