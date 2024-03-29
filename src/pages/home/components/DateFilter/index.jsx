import { DatePicker } from "antd";

const DateFilter = ({ onChangeDate }) => {
  return (
    <div className="lg:max-w-[270px] mr-3 flex-base py-2 sm:py-1">
      <DatePicker.RangePicker
        placeholder={["Filter by date", "Till Now"]}
        allowEmpty={[false, true]}
        onChange={(date, dateString) => {
          if (onChangeDate) {
            onChangeDate(dateString);
          }
        }}
      />
    </div>
  );
};

export default DateFilter;
