import axios, {AxiosResponse} from "axios";
import {Form, Input, message} from "antd";
import TextArea from "antd/es/input/TextArea";

export async function loadTaskFormVariables(response: AxiosResponse, id: string): Promise<any[]> {
    const components = response.data.components;

    const formVariables = await axios.get(`http://localhost:8080/engine-rest/task/${id}/form-variables`)
        .then(response => {return response.data})
        .catch(error => processError(error));

    if (formVariables.length !== 0) {
        for (const component of components) {
            const varName: string = component.key;

            if (varName in formVariables) {
                component.value = formVariables[varName].value;
            }
        }
    }
    return components;
}

export async function loadTaskFormVariablesForStaticForm(id: string): Promise<any> {

    const variablesObject: any = {};

    const formVariables = await axios.get(`http://localhost:8080/engine-rest/task/${id}/form-variables`)
        .then(response => {return response.data})
        .catch(error => processError(error));

    const keys = Object.keys(formVariables);

    for (const key of keys) {
        variablesObject[key] = formVariables[key].value;
    }

    return variablesObject;
}

export async function loadStartFormVariables(response: AxiosResponse, key: string): Promise<any[]> {
    const components = response.data.components;

    const formVariables = await axios.get(`http://localhost:8080/engine-rest/process-definition/key/${key}/form-variables`)
        .then(response => {return response.data})
        .catch(error => processError(error));

    if (formVariables.length !== 0) {
        for (const component of components) {
            const varName: string = component.key;

            if (varName in formVariables) {
                component.value = formVariables[varName].value;
            }
        }
    }
    return components;
}

export function parseComponent(component: any) {
    const {key, value, label, description, type, validate} = component;

    const name = key;
    const initialValue = value;
    const required = validate?.required;
    const pattern = validate?.pattern;
    const maxLength = validate?.maxLength;

    const rules = [];

    if (required != null) {
        const requiredRule = {
            required: true,
            message: `Field ${label} is required`
        };
        rules.push(requiredRule);
    }

    if (pattern != null) {
        const patternRule = {
            pattern: pattern,
            message: `Value does not correspond to pattern ${pattern}`
        };
        rules.push(patternRule);
    }

    let maxLengthRule;

    if (maxLength != null) {
        maxLengthRule = {
            max: maxLength,
            message: `Value exceeds the limit of ${maxLength} symbols`
        };
        rules.push(maxLengthRule);
    }

    return (
        <Form.Item name={name} key={name} initialValue={initialValue} label={label}
                   rules={rules} extra={description}
        >
            {maxLengthRule == undefined ? <Input/> : <TextArea rows={2}/>}
        </Form.Item>
    );
}

export function processError(error: Error) {
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