import { CamundaForm } from "../../gql/graphql";

export function getCamundaFormRecordRepresentation(
  entityInstance?: Partial<CamundaForm> | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
