import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import App from "../app/App";
import {PolicyholderDetails} from "../app/policyholder/PolicyholderDetails";

export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
        <ComponentPreview path="/PolicyholderDetails">
            <PolicyholderDetails/>
        </ComponentPreview>
    </Previews>
  );
};
