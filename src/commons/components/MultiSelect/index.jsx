import { Select } from "antd";

const SelectComponent = ({
  className,
  placeholder,
  value,
  onChange,
  options,
}) => (
  <Select
    maxTagCount={1}
    className={className}
    mode="multiple"
    style={{ width: "100%" }}
    placeholder={placeholder}
    defaultValue={[]}
    value={value}
    onChange={onChange}
    options={options}
  />
);

export default SelectComponent;
