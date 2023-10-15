import React, { memo } from "react";

interface MedicineCheckboxItemProps {
    id: number;
    name: string;
    labelText: string;
    value: string | number;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MedicineCheckboxItem: React.FC<MedicineCheckboxItemProps> = memo((props) => {
  const { id, name, labelText, value, checked, onChange } = props;
  console.log('MedicineCheckboxItem')
  return (
    <>
        <input
            type="checkbox"
            id={`${name}${id}`}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
        />
        <label htmlFor={`${name}${id}`}>{labelText}</label>
    </>
  );
});
