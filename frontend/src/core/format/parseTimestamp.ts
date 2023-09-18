import dayjs from "dayjs";

/**
 * The parse prop accepts a callback taking the value from the input (which is a string),
 * and returning the value to put in the form state.
 * https://marmelab.com/react-admin/Inputs.html#parse
 */
export function parseTimestamp(timestamp: string | null): string {
  return timestamp == null || timestamp === ""
    ? ""
    : "" + dayjs(timestamp, "YYYY-MM-DDTHH:mm").unix() * 1000;
}
