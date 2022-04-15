import { useState } from "react";

function useForm({ defaultValue, type, placeholder, max, min }) {
  const [value, setValue] = useState(defaultValue || "");

  const onChangeFile = (e) => {
    const files = e.terget.files;
    setValue(files[0]);
  };

  const onChangeText = (e) => {
    const valueInput = e.target.value;
    setValue(valueInput);
  };
  const onChangeHandler = {
    files: onChangeFile,
  };
  const onChange = (e) => {
    const onChangeFn = onChangeHandler[type];
    if (!onChangeFn) return onChangeText(e);
    onChangeFn(e);
  };

  return {
    type,
    value,
    onChange,
    placeholder,
    max,
    min,
  };
}

export default useForm;
