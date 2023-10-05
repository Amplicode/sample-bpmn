import { DevSupport } from "@react-buddy/ide-toolbox";
import { AdminContext, AdminUI, Loading, Resource } from "react-admin";
import { useAuthProvider } from "../authProvider/useAuthProvider";
import { getCamundaTaskRecordRepresentation } from "../core/record-representation/getCamundaTaskRecordRepresentation";
import { getClaimOutputDtoRecordRepresentation } from "../core/record-representation/getClaimOutputDtoRecordRepresentation";
import { getPolicyholderDtoRecordRepresentation } from "../core/record-representation/getPolicyholderDtoRecordRepresentation";
import { getPolicyOutputDtoRecordRepresentation } from "../core/record-representation/getPolicyOutputDtoRecordRepresentation";
import { getPolicyTypeDtoRecordRepresentation } from "../core/record-representation/getPolicyTypeDtoRecordRepresentation";
import { dataProvider } from "../dataProvider/graphqlDataProvider";
import { ComponentPreviews, useInitial } from "../dev";
import { i18nProvider } from "../i18nProvider";
import { AdminLayout } from "./AdminLayout";
import { ClaimCreate } from "./screens/claim/ClaimCreate";
import { ClaimEdit } from "./screens/claim/ClaimEdit";
import { ClaimList } from "./screens/claim/ClaimList";
import { PolicyTypeCreate } from "./screens/policy-type/PolicyTypeCreate";
import { PolicyTypeEdit } from "./screens/policy-type/PolicyTypeEdit";
import { PolicyTypeList } from "./screens/policy-type/PolicyTypeList";
import { PolicyCreate } from "./screens/policy/PolicyCreate";
import { PolicyEdit } from "./screens/policy/PolicyEdit";
import { PolicyList } from "./screens/policy/PolicyList";
import { PolicyholderCreate } from "./screens/policyholder/PolicyholderCreate";
import { PolicyholderEdit } from "./screens/policyholder/PolicyholderEdit";
import { PolicyholderList } from "./screens/policyholder/PolicyholderList";
import { TaskList } from "./screens/task-list/TaskList";

export const App = () => {
  const { authProvider, loading } = useAuthProvider();

  if (loading) {
    return (
      <Loading
        loadingPrimary="Loading"
        loadingSecondary="The page is loading, just a moment please"
      />
    );
  }

  return (
    <AdminContext
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
    >
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <AdminUI layout={AdminLayout}>
          <Resource
            name="PolicyTypeDto"
            list={PolicyTypeList}
            recordRepresentation={getPolicyTypeDtoRecordRepresentation}
            create={PolicyTypeCreate}
            edit={PolicyTypeEdit}
          />
          <Resource
            name="PolicyholderDto"
            list={PolicyholderList}
            recordRepresentation={getPolicyholderDtoRecordRepresentation}
            create={PolicyholderCreate}
            edit={PolicyholderEdit}
          />
          <Resource
            name="PolicyOutputDto"
            list={PolicyList}
            recordRepresentation={getPolicyOutputDtoRecordRepresentation}
            create={PolicyCreate}
            edit={PolicyEdit}
          />
          <Resource
            name="ClaimOutputDto"
            list={ClaimList}
            recordRepresentation={getClaimOutputDtoRecordRepresentation}
            create={ClaimCreate}
            edit={ClaimEdit}
          />
          <Resource
            name="CamundaTask"
            list={TaskList}
            recordRepresentation={getCamundaTaskRecordRepresentation}
          />
        </AdminUI>
      </DevSupport>
    </AdminContext>
  );
};
