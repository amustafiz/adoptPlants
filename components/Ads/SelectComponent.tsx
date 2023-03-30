import React from "react";

const FormSelect = (props: any) => {
  const { selectOptions, formValueHolder, handleChange, name } = props;

  const mappedOptions = selectOptions.reduce((acc: {}[], el: string) => {
    const option = el[0].toUpperCase() + el.slice(1);
    const selectObj = { option, value: el };
    acc.push(selectObj);
    return acc;
  }, []);

  return (
    <select value={formValueHolder} onChange={handleChange} name={name}>
      {mappedOptions.map((el: { [key: string]: string }, i: number) => {
        return (
          <option key={`select-${el}-${i}`} value={el.value}>
            {el.option}
          </option>
        );
      })}
    </select>
  );
};

export default FormSelect;
