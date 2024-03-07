import {ActionType, ButtonModel, CamundaComponent} from "../camundaFormTypes";
import {Button, SaveButton} from "react-admin";
import CancelIcon from "@mui/icons-material/Cancel";
import {useFormContext} from "react-hook-form";
import {useCallback} from "react";
import {calcComponentWidth} from "../calcComponentWidth";
import DoneIcon from '@mui/icons-material/Done';

interface ButtonsGroupProps {
  components: any[]
  readonly: boolean
  handleClose: () => void
}

export const ButtonsGroup = ({components, readonly, handleClose}: ButtonsGroupProps) => {
  const buttonsComponents = components.filter(value => value.type === CamundaComponent.Button).map(value => value as ButtonModel);
  const {reset, getValues} = useFormContext();

  const handleReset = useCallback(() => {
    const values = getValues();
    const clearedValues = {};
    Object.keys(values)
      .forEach(key => typeof values[key] === 'number' ? clearedValues[key] = 0 : clearedValues[key] = null);
    reset(clearedValues);
  }, [reset, getValues]);

  return (
    <>
      <div style={{display: "flex"}}>
        {buttonsComponents.length > 0 ? buttonsComponents.map((buttonModel, index) => {
          const width = calcComponentWidth(buttonModel.layout?.columns);
          if (buttonModel.action === ActionType.Submit) {
            return <div key={index} style={{width: width, minWidth: "fit-content"}}><SaveButton icon={<div/>}
                                                                                                label={buttonModel.label}
                                                                                                translate="no"
                                                                                                disabled={readonly}
                                                                                                alwaysEnable={!readonly}/>
            </div>
          } else if (buttonModel.action === ActionType.Reset) {
            return <div key={index} style={{width: width, minWidth: "fit-content"}}><Button size="medium"
                                                                                            label={buttonModel.label}
                                                                                            translate="no"
                                                                                            sx={{marginLeft: "1em"}}
                                                                                            disabled={readonly}
                                                                                            onClick={handleReset}/>
            </div>
          }
        }) : <SaveButton icon={<DoneIcon/>} label="camunda.taskForm.complete.button" alwaysEnable={!readonly}
                         disabled={readonly}/>
        }
        <Button size="medium" label="ra.action.close"
                sx={{marginLeft: "auto"}}
                startIcon={<CancelIcon/>}
                onClick={handleClose}/>
      </div>
    </>
  );
};