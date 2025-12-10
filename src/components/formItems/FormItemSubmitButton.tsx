import { useMemo } from "react";

import { Form } from "antd";
import { CustomButton } from "../CustomButton";

type TButtonPosition = 'left' | 'center' | 'right';

interface IFormItemSubmitButton extends ICustomButton {
  position?: TButtonPosition,
  isBlocked?: boolean,
}

export const FormItemSubmitButton: React.FC<IFormItemSubmitButton> = ({
  onClick,
  isBlocked = false,
  position = 'right',
}) => {
  const setPosition = useMemo(() => {
    switch (position) {
      case 'center':
        return 'center';
      case 'left':
        return 'flex-start';
      default:
        return 'flex-end';
    }
  }, [position]);

  if (isBlocked === false) return (
    <>
      <div style={{ marginTop: 16 }}></div>
      <div style={{ display: 'flex', justifyContent: setPosition }}>
        <Form.Item>
          <CustomButton block={false} children='Submit' htmlType="submit" colorType="success" onClick={onClick} />
        </Form.Item>
      </div>
    </>
  )
  else return (
    <>
      <div style={{ marginTop: 16 }}></div>
      <Form.Item>
        <CustomButton block={true} children='Submit' htmlType="submit" colorType="success" onClick={onClick} />
      </Form.Item>
    </>
  )


};