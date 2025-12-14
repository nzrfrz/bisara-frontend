import type { MenuItemType } from "antd/es/menu/interface";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { TooltipProps } from "antd/es/tooltip";
import type { FormInstance, RadioChangeEvent } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import type { UseQueryResult } from "@tanstack/react-query";

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
    loginCredential: string | undefined,
    setLoginCredential: (loginCredential: string | undefined) => void
  }
  //#endregion

  //#region Page Context
  interface IPublicDictionaryContext {
    page: number,
    setPage: (page: number) => void,
    limitPerPage: number,
    setLimitPerPage: (limitPerPage: number) => void,
    searchValue: string | undefined,
    setSearchValue: (searchValue: string) => void,
    corpusStatus: string, 
    setCorpusStatus: (corpusStatus: string) => void,
    corpusType: string, 
    setCorpusType: (corpusType: string) => void,
    corpusListOptions: CheckboxGroupProps<string>['options'],
    onChangeCorpus: ({ target: { value } }: RadioChangeEvent) => void,
    corpusList: UseQueryResult<ApiSuccessResponse<{ meta: PaginationProps; itemList: IDictionaryData[] }>> | undefined;
  }

  interface IPrivateDictionaryContext {
    form?: FormInstance,
    page: number,
    setPage: (page: number) => void,
    limitPerPage: number,
    setLimitPerPage: (limitPerPage: number) => void,
    searchValue: string | undefined,
    setSearchValue: (searchValue: string) => void,
    corpusStatus: string, 
    setCorpusStatus: (corpusStatus: string) => void,
    corpusType: TCorpusType | string, 
    setCorpusType: (corpusType: TCorpusType | string) => void,
    corpusListOptions: CheckboxGroupProps<string>['options'],
    onChangeCorpus: ({ target: { value } }: RadioChangeEvent) => void,
    corpusList: UseQueryResult<ApiSuccessResponse<{ meta: PaginationProps; itemList: IDictionaryData[] }>> | undefined | any;
    dictDetailModalOpen?: boolean,
    setDictDetailModalOpen?: (dictDetailModalOpen: boolean) => void,
    selectedCorpus?: IDictionaryData,
    setSelectedCorpus?: (selectedCorpus: IDictionaryData) => void,
    onFinishForm?: (values: IDictionaryData | any) => void
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
    totalItem: number,
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
    detail: string,
    response: {
      data: {
        status: number,
        message: string,
        data: T,
      }
    }
  }
  //#endregion

  //#region API Data
  type TCorpusType = 'indonesia' | 'lampung' | 'komering'

  interface UserCredential {
    _id: string,
    username: string,
    email: string,
    userRole: string,
    accessToken: string
  }

  interface IDictionaryData {
    _id: string,
    indonesia: string,
    komering: string[] | string | any,
    lampung: string[] | string | any,
    status: string,
    createdAt: string,
    updatedAt: string
  }
  //#endregion
}