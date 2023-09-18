import { ClaimOutputDto } from "../../gql/graphql";

export function getClaimOutputDtoRecordRepresentation(
  entityInstance?: Partial<ClaimOutputDto> | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.description != null) {
    return String(entityInstance.description);
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
