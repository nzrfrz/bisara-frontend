import {
  useEffect,
  useMemo,
  useState
} from 'react';
import { useTranslation } from "react-i18next";

import {
  Form,
  Input,
  Popover
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

export const FormItemPassword: React.FC<IFormItem> = ({
  helper,
  isMandatory,
  noStyle,
  fieldStatus,
  size = 'middle',
  useStrictPassword,
  withConfirmPassword = false
}) => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const passwordUseWatch = Form.useWatch("password", form);

  const [isInputFocus, setIsInputFocus] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const renderValidationInfo = useMemo(() => {
    const numbers = /[0-9]/g;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const validationResults = [
      {
        id: 0,
        isValid: passwordUseWatch?.match(numbers),
        message: t('password.errorcontainNumber'),
        invalidColor: '#e11d48',
        validColor: '#16a34a',
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
      },
      {
        id: 1,
        isValid: passwordUseWatch?.length >= 8,
        message: t('password.errorMinChars'),
        invalidColor: '#e11d48',
        validColor: '#16a34a',
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
      },
      {
        id: 2,
        isValid: passwordUseWatch?.match(lowerCaseLetters),
        message: t('password.errorLowercase'),
        invalidColor: '#e11d48',
        validColor: '#16a34a',
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
      },
      {
        id: 3,
        isValid: passwordUseWatch?.match(upperCaseLetters),
        message: t('password.errorUppercase'),
        invalidColor: '#e11d48',
        validColor: '#16a34a',
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
      }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {
          validationResults?.map((info) => (
            <div
              key={info.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: info?.isValid ? info.validColor : info.invalidColor,
                gap: 6,
              }}
            >
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <span style={{ color: info?.isValid ? info.validColor : info.invalidColor, }}>{info.message}</span>
                <span>{info?.isValid ? info.validIcon : info.invalidIcon}</span>
              </div>
            </div>
          ))
        }
      </div>
    )
  }, [t, passwordUseWatch]);

  const isStrictPasswordValid = useMemo(() => {
    if (!useStrictPassword) return;

    const numbers = /[0-9]/g;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const validationResults = [
      {
        id: 0,
        isValid: passwordUseWatch?.match(numbers)?.length > 0
      },
      {
        id: 1,
        isValid: passwordUseWatch?.length >= 8
      },
      {
        id: 2,
        isValid: passwordUseWatch?.match(lowerCaseLetters)?.length > 0
      },
      {
        id: 3,
        isValid: passwordUseWatch?.match(upperCaseLetters)?.length > 0
      }
    ];

    return validationResults.every(item => item.isValid);
  }, [useStrictPassword, passwordUseWatch]);

  useEffect(() => {
    if (useStrictPassword === false) return;

    if (isInputFocus === false && useStrictPassword && isStrictPasswordValid === false) return setOpenPopover(false);
    if (isInputFocus === true && useStrictPassword && isStrictPasswordValid === false) return setOpenPopover(true);
    if (isInputFocus === true && useStrictPassword && isStrictPasswordValid === true) return setOpenPopover(false);
  }, [isInputFocus, useStrictPassword, isStrictPasswordValid]);

  return (
    <>
      <Form.Item
        name='password'
        help={helper}
        label='Password'
        noStyle={noStyle}
        required={isMandatory}
        validateStatus={fieldStatus}
        rules={[
          {
            required: true,
            message: t('password.emptyPassword'),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (useStrictPassword === false) {
                if (!value || getFieldValue('password') === value && value.length >= 8) return Promise.resolve();
                else return Promise.reject(t('password.strictPasswordError'));
              }
              else {
                const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
                const isValidPassword = pattern.test(value);
                if (!value || getFieldValue('password') === value && isValidPassword === true) {
                  return Promise.resolve();
                }
                if (isValidPassword === false) return Promise.reject(new Error(t('password.passwordInvalid')));
              }
            }
          })
        ]}
      >
        <div>
          <Input.Password
            size={size}
            placeholder="Input Password"
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
          />
          <Popover open={openPopover} content={renderValidationInfo} placement='bottomRight' styles={ { body: {width: '300px'} }} />
        </div>
      </Form.Item>

      {
        withConfirmPassword === true &&
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          required={isMandatory}
          hasFeedback
          rules={[
            {
              required: isMandatory,
              message: 'password.emptyPasswordConfirmation',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('password.unmatchPasswordConfirmation')));
              },
            }),
          ]}
        >
          <Input.Password
            size={size}
            placeholder="Retype Password"
          />
        </Form.Item>
      }
    </>
  )
};