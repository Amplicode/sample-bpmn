import { PolicyholderDto } from "../../gql/graphql";

export function getPolicyholderDtoRecordRepresentation(
  entityInstance?: Partial<PolicyholderDto> | null
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
