import React from "react";
import {BooleanInput, TextInput} from "react-admin";

export function createFormComponent(component: any) {
    const {key, value, label, description, type, validate} = component;

    const name = key;
    const initialValue = value;

    // const required = validate?.required;
    // const pattern = validate?.pattern;
    // const maxLength = validate?.maxLength;
    // const rules = [];
    // if (required != null) {
    //     const requiredRule = {
    //         required: true,
    //         message: `Field ${label} is required`
    //     };
    //     rules.push(requiredRule);
    // }
    //
    // if (pattern != null) {
    //     const patternRule = {
    //         pattern: pattern,
    //         message: `Value does not correspond to pattern ${pattern}`
    //     };
    //     rules.push(patternRule);
    // }
    //
    // let maxLengthRule;
    //
    // if (maxLength != null) {
    //     maxLengthRule = {
    //         max: maxLength,
    //         message: `Value exceeds the limit of ${maxLength} symbols`
    //     };
    //     rules.push(maxLengthRule);
    // }

    if (type == "checkbox") {
        return (<BooleanInput label={label} source={key} name={key}/>)
    } else {
        return (<TextInput label={label} source={key} name={key}/>)
    }
}

