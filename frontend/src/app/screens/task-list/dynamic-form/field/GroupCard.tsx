import {Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {FormSimpleInput} from "../input/FormSimpleInput";
import {GroupModel} from "../camundaFormTypes";

interface GroupCardProps {
  camundaComponent: GroupModel,
  disabled : boolean,
  width: string
}

export const GroupCard = ({camundaComponent, disabled, width}: GroupCardProps) => {
  const {label, components, showOutline} = camundaComponent;
  return (
    <>
      <Card variant={showOutline ? "outlined" : "elevation"} sx={{width: width}}>
        {label &&
          <CardHeader sx={{paddingBottom: 0}} title={<Typography variant="h6">{label}</Typography>}/>}
        <CardContent>
          {components?.map((nestedComponent, index) =>
            <Grid item xs={12} key={index}>
              <FormSimpleInput camundaComponent={nestedComponent} disabled={disabled} width={width}/>
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
};