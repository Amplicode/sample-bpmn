import { CamundaTaskFilter } from "../../gql/graphql";

export function getCamundaTaskFilterRecordRepresentation(
  entityInstance?: Partial<CamundaTaskFilter> | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.name != null) {
    return String(entityInstance.name);
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
