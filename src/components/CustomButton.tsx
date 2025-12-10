import { useMemo } from "react";

import {
  theme,
  Button,
  Tooltip,
  ConfigProvider,
} from "antd";

export const CustomButton: React.FC<ICustomButton> = ({
  icon,
  shape,
  style,
  loading,
  onClick,
  htmlType,
  disabled,
  children,
  block = false,
  size = "middle",
  tooltipPlacement,
  colorType = 'default',
  tooltipTitle = undefined,
  iconPosition = 'start',
}) => {

  const { token: { colorPrimary } } = theme.useToken();

  const themeToken = useMemo(() => {
    switch (true) {
      case colorType === "success":
        return {
          colorPrimary: '#16a34a',
          colorPrimaryHover: '#007E33',
          colorPrimaryActive: "rgba(0, 126, 51, 0.5)"
        }
      case colorType === "warning":
        return {
          colorPrimary: '#ffbb33',
          colorPrimaryHover: '#FF8800',
          colorPrimaryActive: "rgba(255, 136, 0, 0.5)"
        }
      case colorType === "error":
        return {
          colorPrimary: '#ff4444',
          colorPrimaryHover: '#CC0000',
          colorPrimaryActive: "rgba(204, 0, 0, 0.5)"
        }
      case colorType === "info":
        return {
          colorPrimary: '#0284c7',
          colorPrimaryHover: '#0099CC',
          colorPrimaryActive: "rgba(0, 153, 204, 0.5)"
        }
      case colorType === "active":
        return {
          colorPrimary: colorPrimary,
          colorPrimaryHover: colorPrimary,
          colorPrimaryActive: colorPrimary,
        }
      default:
        break;
    }
  }, [colorType]);

  const buttonType = useMemo(() => {
    return colorType !== "default" || colorType === "active" as string ? "primary" : "default";
  }, [colorType]);

  return (
    <div style={{ width: '100%' }}>
      <ConfigProvider theme={{ token: { ...themeToken } }}>
        <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
          <Button
            size={size}
            icon={icon}
            block={block}
            shape={shape}
            style={style}
            loading={loading}
            type={buttonType}
            onClick={onClick}
            disabled={disabled}
            htmlType={htmlType}
            iconPosition={iconPosition}
          >
            {children}
          </Button>
        </Tooltip>
      </ConfigProvider>
    </div>
  );
};