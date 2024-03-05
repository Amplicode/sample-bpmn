export enum CamundaComponent {
  //Basic
  TextField = "textfield",
  TextArea = "textarea",
  Number = "number",
  DateTime = "datetime",

  //Selection
  CheckBox = "checkbox",
  TagList = "taglist",
  Select = "select",
  CheckList = "checklist",
  Radio = "radio",

  //Presentation
  Group = "group",
  Spacer = "spacer",
  TextView = "text",
  Image = "image",

  Button = "button",
}

export enum CamundaDateTimeType {
  Time = "time",
  Date = "date",
  DateTime = "datetime"
}

export enum TimeFormat {
  NoTimezone = "no_timezone",
  UtcOffset = "utc_offset",
  UtcNormalized = "utc_normalized"
}

interface LayoutModel {
  row: string
  columns?: number | null | "auto"
}

interface AppearanceModel {
  prefixAdorner?: string
  suffixAdorner?: string
}

interface BaseValidation {
  required?: boolean
}

export interface TextFieldValidation extends BaseValidation {
  validationType?: "email" | "phone"
  pattern?: string
  minLength?: number
  maxLength?: number
}

export interface TextAreaValidation extends BaseValidation {
  minLength?: number
  maxLength?: number
}

export interface NumberValidation extends BaseValidation {
  min?: number
  max?: number
}

export interface BaseComponentModel {
  id: string
  layout: LayoutModel
  type: CamundaComponent
  label: string
}

export interface TextFieldModel extends BaseComponentModel {
  key: string
  description?: string | null
  defaultValue?: string | null
  disabled?: boolean
  readonly?: boolean
  appearance?: AppearanceModel
  validate?: TextFieldValidation
}

export interface TextAreaModel extends BaseComponentModel {
  key: string
  description?: string | null
  defaultValue?: string | null
  disabled?: boolean
  readonly?: boolean
  validate?: TextAreaValidation
}

export interface NumberModel extends BaseComponentModel {
  key: string
  description?: string | null
  defaultValue?: string | null
  disabled?: boolean
  readonly?: boolean
  appearance?: AppearanceModel
  decimalDigits?: number
  increment?: string
  serializeToString?: boolean
  validate?: NumberValidation
}

export interface DateTimeModel extends BaseComponentModel {
  key: string
  description?: string | null
  dateLabel?: string
  timeLabel?: string
  disabled?: boolean
  readonly?: boolean
  subtype: CamundaDateTimeType
  disallowPassedDates?: boolean
  use24h?: boolean //for time
  timeSerializingFormat?: TimeFormat
  timeInterval?: number
  validate?: BaseValidation
}

export interface CheckBoxModel extends BaseComponentModel {
  key: string
  description?: string | null
  defaultValue?: boolean
  validate?: BaseValidation
}

export interface CheckListModel extends BaseComponentModel {
  key: string
  description?: string | null
  values?: Option[]
  valuesKey?: string
  valuesExpression?: string
  validate?: BaseValidation
}

export interface TagListModel extends BaseComponentModel {
  key: string
  description?: string | null
  values?: Option[]
  valuesKey?: string
  valuesExpression?: string
  validate?: BaseValidation
}

export interface SelectModel extends BaseComponentModel {
  key: string
  description?: string | null
  defaultValue?: string
  searchable?: boolean
  values?: Option[]
  valuesKey?: string
  valuesExpression?: string
  validate?: BaseValidation
}

export interface RadioModel extends BaseComponentModel {
  key: string
  description?: string | null
  defaultValue?: string
  values?: Option[]
  valuesKey?: string
  valuesExpression?: string
  validate?: BaseValidation
}

export interface GroupModel extends BaseComponentModel {
  key: string
  showOutline?: boolean
  path?: string
  components?: BaseComponentModel[]
}

export interface ImageModel extends BaseComponentModel {
  source?: string
  alt?: string
}

export interface TextModel extends BaseComponentModel {
  text?: string
}

export interface SpacerModel extends BaseComponentModel {
  height?: number
}


export interface ButtonModel extends BaseComponentModel {
  action: ActionType
}

export enum ActionType {
  Submit = "submit",
  Reset = "reset"
}

export interface Option {
  label: string
  value: string
}

interface SimpleInputProps {
  camundaComponent: any,
  disabled: boolean,
  width: string
}