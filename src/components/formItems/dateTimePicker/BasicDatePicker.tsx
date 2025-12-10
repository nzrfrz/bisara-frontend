import { useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Form,
  DatePicker,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { toOrdinal } from "../../../modules";
import type { RangePickerProps } from "antd/es/date-picker";

dayjs.extend(quarterOfYear);
dayjs.extend(weekOfYear);

interface IBasicDatePicker extends IFormItem {
  required?: boolean,
  pickerType?: TDateTimePickerFormType,
  withTime?: boolean,
  minDate?: Dayjs,
  maxDate?: Dayjs,
  disabledDate?: RangePickerProps['disabledDate'];
  disabledTime?: RangePickerProps['disabledTime'] | any;
}

export const BasicDatePicker: React.FC<IBasicDatePicker> = ({
  name,
  size,
  label,
  helper,
  minDate,
  maxDate,
  disabled,
  withTime,
  pickerType,
  disabledDate,
  disabledTime,
  fieldStatus,
  isMandatory = true,
}) => {
  const { t } = useTranslation();
  const formInstance = Form.useFormInstance();
  const formUseWatch = Form.useWatch(name, formInstance);

  const formItemValueKey = useMemo(() => {
    let valueKey;

    switch (pickerType) {
      case 'date':
        valueKey = 'formattedDate'
        break;
      case 'month':
        valueKey = 'formattedMonth'
        break;
      case 'quarter':
        valueKey = 'formattedQuarter'
        break;
      case 'week':
        valueKey = 'formattedWeek'
        break;
      case 'year':
        valueKey = 'formattedYear'
        break;
      default:
        break;
    };

    return valueKey;
  }, [pickerType]);

  const calendarPlaceholder = useMemo(() => {
    let placeholder;

    switch (pickerType) {
      case 'date':
        placeholder = t('dateTimePicker.datePlaceholder');
        break;
      case 'month':
        placeholder = t('dateTimePicker.monthPlaceholder');
        break;
      case 'quarter':
        placeholder = t('dateTimePicker.quarterPlaceholder');
        break;
      case 'week':
        placeholder = t('dateTimePicker.weekPlaceholder')
        break;
      case 'year':
        placeholder = t('dateTimePicker.yearPlaceholder')
        break;
      default:
        break;
    };

    return placeholder;
  }, [t, pickerType]);

  useEffect(() => {
    let formattedDate;
    let formattedMonth;
    let formattedQuarter;
    let formattedWeek;
    let formattedYear;
    let formattedTime;
    let formattedDateTime;

    switch (pickerType) {
      case 'date':
        formattedDate = formUseWatch?.originalCalendar === undefined ? '' : dayjs(formUseWatch?.originalCalendar).format('YYYY, MMMM DD');
        formattedTime = formUseWatch?.originalCalendar === undefined ? '' : dayjs(formUseWatch?.originalTime).format('HH:mm');
        formattedDateTime = formUseWatch?.originalCalendar === undefined ? '' : withTime === true ? `${formattedDate} | ${formattedTime}` : `${formattedDate}`;
        break;
      case 'month':
        formattedMonth = formUseWatch?.originalCalendar === undefined ? '' : `${dayjs(formUseWatch?.originalCalendar).format('YYYY, MMMM')}`;
        formattedDateTime = formUseWatch?.originalCalendar === undefined ? '' : `${dayjs(formUseWatch?.originalCalendar).format('YYYY, MMMM')}`;
        break;
      case 'quarter':
        formattedQuarter = formUseWatch?.originalCalendar === undefined ? '' : `${dayjs(formUseWatch?.originalCalendar).year()}-Q${dayjs(formUseWatch?.originalCalendar).quarter()}`;
        formattedDateTime = formUseWatch?.originalCalendar === undefined ? '' : `${dayjs(formUseWatch?.originalCalendar).year()}-Q${dayjs(formUseWatch?.originalCalendar).quarter()}`;
        break;
      case 'week':
        const ordinal = toOrdinal(dayjs(formUseWatch?.originalCalendar).week());
        formattedWeek = formUseWatch?.originalCalendar === undefined ? '' : `${dayjs(formUseWatch?.originalCalendar).year()}-${ordinal}`;
        formattedDateTime = formUseWatch?.originalCalendar === undefined ? '' : `${dayjs(formUseWatch?.originalCalendar).year()}-${ordinal}`;
        break;
      case 'year':
        formattedYear = formUseWatch?.originalCalendar === undefined ? '' : `${dayjs(formUseWatch?.originalCalendar).year()}`;
        formattedDateTime = formUseWatch?.originalCalendar === undefined ? '' : `${dayjs(formUseWatch?.originalCalendar).year()}`;
        break;
      default:
        break;
    }

    formInstance.setFieldValue(name, {
      originalCalendar: formUseWatch?.originalCalendar,
      originalTime: formUseWatch?.originalTime,
      formattedDate,
      formattedMonth,
      formattedQuarter,
      formattedWeek,
      formattedYear,
      formattedTime,
      formattedDateTime
    });
  }, [formInstance, formUseWatch, pickerType, withTime]);

  useEffect(() => {
    formInstance.resetFields();
  }, [pickerType]);

  return (
    <>
      <Form.Item
        help={helper}
        label={label}
        required={isMandatory}
        validateStatus={fieldStatus}
      >
        <Row gutter={[8, 8]}>
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: withTime === true && pickerType === 'date' ? '50%' : '100%' }}
            md={{ flex: withTime === true && pickerType === 'date' ? '50%' : '100%' }}
            lg={{ flex: withTime === true && pickerType === 'date' ? '50%' : '100%' }}
            xl={{ flex: withTime === true && pickerType === 'date' ? '50%' : '100%' }}
          >
            <Form.Item
              noStyle
              name={[name as string, 'originalCalendar']}
              rules={[
                {
                  required: isMandatory,
                  message: t('emptyFormField'),
                }
              ]}
            >
              <DatePicker
                size={size}
                minDate={minDate}
                maxDate={maxDate}
                picker={pickerType}
                disabled={disabled}
                needConfirm={false}
                style={{ width: '100%' }}
                disabledDate={disabledDate}
                placeholder={calendarPlaceholder}
              />
            </Form.Item>
          </Col>
          {
            withTime === true && pickerType === 'date' &&
            <Col
              xs={{ flex: '100%' }}
              sm={{ flex: '50%' }}
              md={{ flex: '50%' }}
              lg={{ flex: '50%' }}
              xl={{ flex: '50%' }}
            >
              <Form.Item
                noStyle
                name={[name as string, 'originalTime']}
                dependencies={[name as string, 'originalDate']}
                rules={[
                  {
                    required: isMandatory,
                    message: formUseWatch?.originalDate !== undefined ? 'Time must be selected' : '',
                  }
                ]}
              >
                <DatePicker
                  size={size}
                  picker={'time'}
                  disabled={disabled}
                  needConfirm={false}
                  style={{ width: '100%' }}
                  disabledTime={disabledTime}
                  placeholder={t('dateTimePicker.timePlaceholder')}
                />
              </Form.Item>
            </Col>
          }
        </Row>
      </Form.Item>
      <Form.Item noStyle name={[name as string, formItemValueKey as string]}></Form.Item>
      {
        withTime === true && pickerType === 'date' ?
          <Form.Item noStyle name={[name as string, 'formattedTime']}></Form.Item>
          :
          null
      }
      <Form.Item noStyle name={[name as string, 'formattedDateTime']}></Form.Item>
    </>
  )
};
