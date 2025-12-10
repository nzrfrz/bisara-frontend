import { Form, Checkbox, Col, Row } from 'antd';
import type { CheckboxOptionType } from 'antd';
import { useTranslation } from 'react-i18next';

interface ICheckBoxForm extends IFormItem {
  selectionData: CheckboxOptionType<string>[],
}

export const FormItemCheckBox: React.FC<ICheckBoxForm> = ({
  name,
  label,
  helper,
  disabled,
  selectionData,
  noStyle = false,
  isMandatory = true,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name={name}
      help={helper}
      label={label}
      noStyle={noStyle}
      rules={[
        {
          required: isMandatory,
          message: t('checkboxFieldRequired')
        }
      ]}
    >
      <Checkbox.Group
        style={{ width: '100%' }}
      >
        <Row gutter={[8, 8]}>
          {
            selectionData.map((item, index) =>
              <Col key={index} >
                <Checkbox
                  value={item.value}
                  disabled={disabled}
                >
                  {item.label}
                </Checkbox>
              </Col>
            )
          }
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
};