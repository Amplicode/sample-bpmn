import {CamundaComponent} from "../camundaFormTypes";
import {CamundaDateTimeInput} from "./CamundaDateTimeInput";
import {TextFieldInput} from "./TextFieldInput";
import {TextAreaInput} from "./TextAreaInput";
import {CheckBoxInput} from "./CheckBoxInput";
import {TagListInput} from "./TagListInput";
import {CamundaSelectInput} from "./CamundaSelectInput";
import {CheckListInput} from "./CheckListInput";
import {RadioInput} from "./RadioInput";
import {CamundaNumberInput} from "./CamundaNumberInput";

interface TaskFormComponentInputProps {
  camundaComponent: any
  disabled : boolean,
  width: string
}

export const FormSimpleInput = ({camundaComponent, disabled, width}: TaskFormComponentInputProps) => {
  const {type} = camundaComponent;
  
  return (
    <>
      {type === CamundaComponent.TextField &&
        <TextFieldInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
      {type === CamundaComponent.TextArea &&
        <TextAreaInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
      {type === CamundaComponent.CheckBox &&
        <CheckBoxInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
      {type === CamundaComponent.TagList &&
        <TagListInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
      {type === CamundaComponent.Select &&
        <CamundaSelectInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
      {type === CamundaComponent.CheckList &&
        <CheckListInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
      {type === CamundaComponent.Radio &&
        <RadioInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
      {type === CamundaComponent.Number &&
        <CamundaNumberInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
      {type === CamundaComponent.DateTime &&
        <CamundaDateTimeInput camundaComponent={camundaComponent} disabled={disabled} width={width}/>}
    </>
  );
};