import { CamundaProcessDefinition } from "@amplicode/gql/graphql";

export function getCamundaProcessDefinitionRecordRepresentation(
  entityInstance?: Partial<CamundaProcessDefinition> | null
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
