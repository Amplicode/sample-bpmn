import { CamundaTask } from "../../gql/graphql";

export function getCamundaTaskRecordRepresentation(
  entityInstance?: Partial<CamundaTask> | null
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
