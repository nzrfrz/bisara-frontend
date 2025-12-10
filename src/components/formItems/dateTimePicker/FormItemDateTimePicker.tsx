import { Dayjs } from 'dayjs';
import { BasicDatePicker } from './BasicDatePicker';
import { RangeDatePicker } from './RangeDatePicker';

import type { RangePickerProps } from 'antd/es/date-picker';

interface IFormItemDateTimePicker extends IFormItem {
  pickerFieldType?: TDateTimePickerFormMode,
  pickerType?: TDateTimePickerFormType,
  withTime?: boolean,
  minDate?: Dayjs,
  maxDate?: Dayjs,
  disabledDate?: RangePickerProps['disabledDate'] | any;
  disabledTime?: RangePickerProps['disabledTime'] | any;
};

export const FormItemDateTimePicker: React.FC<IFormItemDateTimePicker> = ({
  name,
  label,
  helper,
  minDate,
  maxDate,
  disabled,
  fieldStatus,
  disabledDate,
  disabledTime,
  size = "middle",
  withTime = false,
  isMandatory = true,
  pickerType = 'date',
  pickerFieldType = 'single',
}) => {
  if (pickerFieldType === 'single') {
    return (
      <BasicDatePicker
        name={name}
        size={size}
        label={label}
        helper={helper}
        minDate={minDate}
        maxDate={maxDate}
        withTime={withTime}
        disabled={disabled}
        pickerType={pickerType}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
        isMandatory={isMandatory}
        fieldStatus={fieldStatus}
      />
    )
  }
  else {
    return (
      <RangeDatePicker
        name={name}
        size={size}
        label={label}
        helper={helper}
        minDate={minDate}
        maxDate={maxDate}
        withTime={withTime}
        disabled={disabled}
        pickerType={pickerType}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
        fieldStatus={fieldStatus}
        isMandatory={isMandatory}
      />
    );
  }
};