import {CamundaComponent} from "./camundaFormTypes";
import {FormSimpleInput} from "./input/FormSimpleInput";
import {GroupCard} from "./field/GroupCard";
import {calcComponentWidth} from "./calcComponentWidth";

interface CamundaFormComponentProps {
  camundaComponent: any
  readonly: boolean
}

export const CamundaFormComponent = ({camundaComponent, readonly}: CamundaFormComponentProps) => {
  const {type, readonly : componentReadonly, layout} = camundaComponent;
  const width = calcComponentWidth(layout?.columns);
  const componentDisabled = componentReadonly || readonly;
  return (
    <>
      {type === CamundaComponent.Group ?
        <GroupCard camundaComponent={camundaComponent} disabled={componentDisabled} width={width}/>
        : <FormSimpleInput camundaComponent={camundaComponent} disabled={componentDisabled} width={width}/>
      }
    </>
  );
};