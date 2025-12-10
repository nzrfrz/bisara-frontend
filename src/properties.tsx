import type { MenuItemType } from "antd/es/menu/interface";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { TooltipProps } from "antd/es/tooltip";
import type { FormInstance } from "antd";

declare global {
  //#region Global Context
  type notificationType = 'success' | 'info' | 'warning' | 'error';
  type windowDimensionData = { width: number, height: number };

  interface IGlobalContext {
    isDarkMode: boolean,
    setIsDarkMode: (isDarkMode: boolean) => void,
    language: string,
    setLanguage: (language: string) => void,
    windowDimension: windowDimensionData,
    openNotification: (type: notificationType, key: string, message: string, description: string) => void,
    openMessage: (type: notificationType, content: string) => void,
    contentContainerRef: React.RefObject<HTMLDivElement> | unknown | null,
  }
  //#endregion

  //#region Route
  interface ISidebarItem extends MenuItemType {
    path?: string;
    element?: React.ReactNode;
  }

  interface ISidebarRoute extends ISidebarItem {
    children?: ISidebarRoute[] | null
  }

  interface IRouteItem extends MenuItemType {
    path?: string;
    element?: React.ReactNode;
  }

  interface IPageRoute extends IRouteItem {
    children?: IPageRoute[] | null
  }
  //#endregion

  //#region Custom Button
  type TIconButtonPosition = 'start' | 'end';
  type TButtonShape = "default" | "circle" | "round" | undefined;
  type TButtonHtml = "button" | "submit" | "reset" | undefined;
  type TButtonColor = "active" | "success" | "warning" | "error" | "info" | "default";

  interface ICustomButton {
    shape?: TButtonShape,
    block?: boolean,
    size?: SizeType,
    loading?: boolean,
    disabled?: boolean,
    htmlType?: TButtonHtml,
    colorType?: TButtonColor,
    children?: React.ReactNode,
    icon?: React.ReactNode | undefined,
    iconPosition?: TIconButtonPosition,
    style?: React.CSSProperties | undefined,
    onClick?: React.MouseEventHandler<HTMLElement>,
    tooltipTitle?: string | undefined,
    tooltipPlacement?: TooltipProps['placement'] | undefined,
  }
  //#endregion

  //#region Form
  type TInputIconPosition = 'start' | 'end';
  type TFormFieldStatus = "warning" | "error" | undefined;
  type TNumberFormControlType = 'basic' | 'seperate' | 'combine';
  type TFormFieldCurrencyCode =
    | "GBP"
    | "USD"
    | "EUR"
    | "BRL"
    | "RUB"
    | "CNY"
    | "JPY"
    | "KRW"
    | "AED"
    | "INR"
    | "THB"
    | "IDR"
    | "MYR"
    | "VND"
    | "PLN"
    | "TRY"
    | "SEK";
  type TDateTimePickerFormMode = 'single' | 'range';
  type TSelectSearchFormMode = 'single' | 'multiple'; // add "tags" mode for future development
  type TDateTimePickerFormType = 'date' | 'week' | 'month' | 'quarter' | 'year';

  interface IFormItemWrapper<T = any> {
    form?: FormInstance,
    children?: React.ReactNode,
    onFinishForm?: (values: Record<string, T>) => void,
    disabled?: boolean,
  }

  interface IFormItem {
    name?: [string, number] | string,
    label?: string | React.ReactNode,
    helper?: string,
    noStyle?: boolean,
    size?: SizeType,
    fieldStatus?: TFormFieldStatus,
    isMandatory?: boolean,
    addonAfter?: React.ReactNode | string;
    addonBefore?: React.ReactNode | string;
    disabled?: boolean,
    iconPosition?: TInputIconPosition,
    withConfirmPassword?: boolean,
    useStrictPassword?: boolean
  }
  //#endregion

  //#region File Uploader
  type TUploaderType = 'card' | 'avatar' | 'basic' | 'drag-and-drop';
  type TFileAlias = 'archive' | 'document' | 'image' | 'audio' | 'video' | 'all';

  interface IFileUploaderRC {
    multiple?: boolean,
    maxCount?: number,
    fileType?: TFileAlias,
    maxFileSize?: number,
    isFormError?: boolean,
    cropBeforeUpload?: boolean,
  }

  interface IFormUploadFile extends IFormItem, IFileUploaderRC {
    uploaderType: TUploaderType,
    isFormSubmitted: boolean,
  }

  interface IFilePreviewData {
    alias?: string,
    mimeType?: string,
    url?: string
  }
  //#endregion

  //#region API Services
  interface PaginationProps {
    page: number,
    limit: number,
    totalPage: number,
  }

  interface ApiSuccessResponse<T = unknown> {
    nextCursor: unknown
    status: number,
    message: string,
    data: T,
  }

  interface ApiErrorResponse<T = unknown> {
    status: number,
    message: string,
    response: {
      data: {
        status: number,
        message: string,
        data: T,
      }
    }
  }
  //#endregion
}