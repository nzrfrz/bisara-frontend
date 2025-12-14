import { Input } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SearchProps } from "antd/es/input";

const { Search } = Input;

interface IThisProps {
  disabled?: boolean
  placeHolder?: string,
  size: SizeType,
  onSearch?: SearchProps['onSearch'],
  onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export const SearchInput: React.FC<IThisProps> = ({
  disabled,
  size,
  placeHolder,
  onSearch,
  onChange,
}) => {
  return (
    <Search
      allowClear
      enterButton
      size={size}
      disabled={disabled}
      onSearch={onSearch}
      onChange={onChange}
      placeholder={placeHolder}
    />
  );
};