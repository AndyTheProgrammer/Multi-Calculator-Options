import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import format from "date-fns/format";

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      className="date-picker"
      autoComplete="off"
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}

      onChange={date => {
            console.log(format(date, "yyyy-MM-dd"))
            setFieldValue(field.name, format(date, "yyyy-MM-dd"));
      }}
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default DatePickerField;
