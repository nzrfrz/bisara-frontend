import { useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Form,
  DatePicker,
  Space,
} from "antd";
import { AiOutlineSwapRight } from "react-icons/ai";
import dayjs, { Dayjs } from "dayjs";
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { toOrdinal } from "../../../modules";
import { useTranslation } from "react-i18next";
import type { RangePickerProps } from "antd/es/date-picker";

dayjs.extend(quarterOfYear);
dayjs.extend(weekOfYear);

interface IRangeDatePicker extends IFormItem {
  required?: boolean,
  pickerType?: TDateTimePickerFormType,
  withTime?: boolean,
  minDate?: Dayjs,
  maxDate?: Dayjs,
  disabledDate?: RangePickerProps['disabledDate'] | any;
  disabledTime?: RangePickerProps['disabledTime'] | any;
}

export const RangeDatePicker: React.FC<IRangeDatePicker> = ({
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
  // console.log(formUseWatch?.startDate);

  const disabledDateForMonth: RangePickerProps['disabledDate'] = (current) => {
    if (formUseWatch?.originalCalendarStart !== undefined) return current && current < dayjs(formUseWatch?.originalCalendarStart);
    return false;
  };

  const formItemValueKey = useMemo(() => {
    let startValueKey;
    let endValueKey;

    switch (pickerType) {
      case 'date':
        startValueKey = 'formattedStartDate';
        endValueKey = 'formattedEndDate';
        break;
      case 'month':
        startValueKey = 'formattedStartMonth';
        endValueKey = 'formattedEndMonth';
        break;
      case 'quarter':
        startValueKey = 'formattedStartQuarter';
        endValueKey = 'formattedEndQuarter';
        break;
      case 'week':
        startValueKey = 'formattedStartWeek';
        endValueKey = 'formattedEndWeek';
        break;
      case 'year':
        startValueKey = 'formattedStartYear';
        endValueKey = 'formattedEndYear';
        break;
      default:
        break;
    };

    return {
      startValueKey,
      endValueKey,
    };
  }, [pickerType]);

  const calendarPlaceholder = useMemo(() => {
    let calendarStartPlaceholder;
    let calendarEndPlaceholder;

    switch (pickerType) {
      case 'date':
        calendarStartPlaceholder = t('dateTimePicker.startDatePlaceholder');
        calendarEndPlaceholder = t('dateTimePicker.endDatePlaceholder');
        break;
      case 'month':
        calendarStartPlaceholder = t('dateTimePicker.startMonthPlaceholder');
        calendarEndPlaceholder = t('dateTimePicker.endMonthPlaceholder');
        break;
      case 'quarter':
        calendarStartPlaceholder = t('dateTimePicker.startQuarterPlaceholder');
        calendarEndPlaceholder = t('dateTimePicker.endQuarterPlaceholder');
        break;
      case 'week':
        calendarStartPlaceholder = t('dateTimePicker.startWeekPlaceholder');
        calendarEndPlaceholder = t('dateTimePicker.endWeekPlaceholder');
        break;
      case 'year':
        calendarStartPlaceholder = t('dateTimePicker.startYearPlaceholder');
        calendarEndPlaceholder = t('dateTimePicker.endYearPlaceholder');
        break;
      default:
        break;
    };

    return {
      calendarStartPlaceholder,
      calendarEndPlaceholder
    };
  }, [t, pickerType]);

  useEffect(() => {
    let formattedStartDate;
    let formattedEndDate;
    let formattedStartMonth;
    let formattedEndMonth;
    let formattedStartQuarter;
    let formattedEndQuarter;
    let formattedStartWeek;
    let formattedEndWeek;
    let formattedStartYear;
    let formattedEndYear;
    let formattedStartTime;
    let formattedEndTime;
    let formattedDateTime;

    switch (pickerType) {
      case 'date':
        formattedStartDate = formUseWatch?.originalCalendarStart === undefined ? '' : dayjs(formUseWatch?.originalCalendarStart).format('YYYY, MMMM DD');
        formattedEndDate = formUseWatch?.originalCalendarEnd === undefined ? '' : dayjs(formUseWatch?.originalCalendarEnd).format('YYYY, MMMM DD');
        formattedStartTime = formUseWatch?.originalCalendarStart === undefined ? '' : dayjs(formUseWatch?.originalStartTime).format('HH:mm');
        formattedEndTime = formUseWatch?.originalCalendarEnd === undefined ? '' : dayjs(formUseWatch?.originalEndTime).format('HH:mm');
        formattedDateTime = formUseWatch?.originalCalendarStart === undefined ? '' : withTime === true ? `${formattedStartDate} | ${formattedStartTime} - ${formattedEndDate} | ${formattedEndTime}` : `${formattedStartDate} - ${formattedEndDate}`;
        break;
      case 'month':
        formattedStartMonth = formUseWatch?.originalCalendarStart === undefined ? '' : `${dayjs(formUseWatch?.originalCalendarStart).format('YYYY, MMMM')}`;
        formattedEndMonth = formUseWatch?.originalCalendarEnd === undefined ? '' : `${dayjs(formUseWatch?.originalCalendarEnd).format('YYYY, MMMM')}`;
        formattedDateTime = formUseWatch?.originalCalendarStart === undefined ? '' : `${formattedStartMonth} - ${formattedEndMonth}`;
        break;
      case 'quarter':
        formattedStartQuarter = formUseWatch?.originalCalendarStart === undefined ? '' : `${dayjs(formUseWatch?.originalCalendarStart).year()}-Q${dayjs(formUseWatch?.originalCalendarStart).quarter()}`;
        formattedEndQuarter = formUseWatch?.originalCalendarEnd === undefined ? '' : `${dayjs(formUseWatch?.originalCalendarEnd).year()}-Q${dayjs(formUseWatch?.originalCalendarEnd).quarter()}`;
        formattedDateTime = formUseWatch?.originalCalendarStart === undefined ? '' : `${formattedStartQuarter} - ${formattedEndQuarter}`;
        break;
      case 'week':
        const ordinalStart = toOrdinal(dayjs(formUseWatch?.originalCalendarStart).week());
        const ordinalEnd = toOrdinal(dayjs(formUseWatch?.originalCalendarEnd).week());
        formattedStartWeek = formUseWatch?.originalCalendarStart === undefined ? '' : `${dayjs(formUseWatch?.originalCalendarStart).year()}-${ordinalStart}`;
        formattedEndWeek = formUseWatch?.originalCalendarEnd === undefined ? '' : `${dayjs(formUseWatch?.originalCalendarEnd).year()}-${ordinalEnd}`;
        formattedDateTime = formUseWatch?.originalCalendarStart === undefined ? '' : `${formattedStartWeek} - ${formattedEndWeek}`;
        break;
      case 'year':
        formattedStartYear = formUseWatch?.originalCalendarStart === undefined ? '' : `${dayjs(formUseWatch?.originalCalendarStart).year()}`;
        formattedEndYear = formUseWatch?.originalCalendarEnd === undefined ? '' : `${dayjs(formUseWatch?.originalCalendarEnd).year()}`;
        formattedDateTime = formUseWatch?.originalCalendarStart === undefined ? '' : `${formattedStartYear} - ${formattedEndYear}`;
        break;
      default:
        break;
    }

    formInstance.setFieldValue(name, {
      originalCalendarStart: formUseWatch?.originalCalendarStart,
      originalCalendarEnd: formUseWatch?.originalCalendarEnd,
      originalStartTime: formUseWatch?.originalStartTime,
      originalEndTime: formUseWatch?.originalEndTime,
      formattedStartDate,
      formattedEndDate,
      formattedStartMonth,
      formattedEndMonth,
      formattedStartQuarter,
      formattedEndQuarter,
      formattedStartWeek,
      formattedEndWeek,
      formattedStartYear,
      formattedEndYear,
      formattedStartTime,
      formattedEndTime,
      formattedDateTime
    });
  }, [formInstance, formUseWatch, pickerType, withTime]);

  useEffect(() => {
    if (formUseWatch?.originalCalendarStart === null) return formInstance?.resetFields();
  }, [formUseWatch]);

  return (
    <>
      <Form.Item
        help={helper}
        label={label}
        required={isMandatory}
        validateStatus={fieldStatus}
      >
        <Row gutter={[8, 4]} align='middle'>
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '100%' }}
            md={{ flex: '100%' }}
            lg={{ flex: '100%' }}
            xl={{ flex: '100%' }}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Form.Item
                noStyle
                name={[name as string, 'originalCalendarStart']}
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
                  placeholder={calendarPlaceholder.calendarStartPlaceholder}
                />
              </Form.Item>
              {
                withTime === true && pickerType === 'date' &&
                <Form.Item
                  noStyle
                  name={[name as string, 'originalStartTime']}
                  rules={[
                    {
                      required: isMandatory,
                      message: '',
                    }
                  ]}
                >
                  <DatePicker
                    size={size}
                    picker={'time'}
                    disabled={disabled}
                    style={{ width: '100%' }}
                    disabledTime={disabledTime}
                    placeholder={t('dateTimePicker.startTimePlaceholder')}
                  />
                </Form.Item>
              }
            </Space.Compact>
          </Col>
          <Row align='middle' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <AiOutlineSwapRight style={{ color: 'white', rotate: '90deg' }} />
          </Row>
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '100%' }}
            md={{ flex: '100%' }}
            lg={{ flex: '100%' }}
            xl={{ flex: '100%' }}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Form.Item
                noStyle
                name={[name as string, 'originalCalendarEnd']}
                rules={[
                  {
                    required: isMandatory,
                    message: '',
                  }
                ]}
              >
                <DatePicker
                  size={size}
                  minDate={minDate}
                  maxDate={maxDate}
                  picker={pickerType}
                  needConfirm={false}
                  style={{ width: '100%' }}
                  disabledDate={disabledDateForMonth}
                  placeholder={calendarPlaceholder.calendarEndPlaceholder}
                  disabled={formUseWatch?.originalCalendarStart === undefined || formUseWatch?.originalCalendarStart === null ? true : disabled}
                />
              </Form.Item>
              {
                withTime === true && pickerType === 'date' &&
                <Form.Item
                  noStyle
                  name={[name as string, 'originalEndTime']}
                  rules={[
                    {
                      required: isMandatory,
                      message: ''
                    }
                  ]}
                >
                  <DatePicker
                    size={size}
                    picker={'time'}
                    style={{ width: '100%' }}
                    disabledTime={disabledTime}
                    placeholder={t('dateTimePicker.endTimePlaceholder')}
                    disabled={formUseWatch?.originalCalendarStart === undefined || formUseWatch?.originalCalendarStart === null ? true : disabled}
                  />
                </Form.Item>
              }
            </Space.Compact>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item noStyle name={[name as string, formItemValueKey.startValueKey as string]}></Form.Item>
      <Form.Item noStyle name={[name as string, formItemValueKey.endValueKey as string]}></Form.Item>
      {
        withTime === true && pickerType === 'date' ?
          <>
            <Form.Item noStyle name={[name as string, 'formattedStartTime']}></Form.Item>
            <Form.Item noStyle name={[name as string, 'formattedEndTime']}></Form.Item>
          </>
          :
          null
      }
      <Form.Item noStyle name={[name as string, 'formattedDateTime']}></Form.Item>
    </>
  );
};