import React, { memo } from "react";

interface MedicineInputProps {
  labelText: string;
  name: string;
  id: string;
  type: string;
  value: string | number;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MedicineInput: React.FC<MedicineInputProps> = memo((props) => {
  const {labelText, name, id, type, value, error, onChange} = props;
  console.log('MedicineInput');
  return (
    <div className="d_container flexiblebox">
      <dt className="dt regist_dt_bg"><label htmlFor={id}>{labelText}</label></dt>
      <dd className="dd">
          <input
            type={type}
            name={name}
            id={name}
            className="input_text"
            value={value}
            onChange={onChange}
          />
          {error && <p className="error">{error}</p>}
      </dd>
    </div>
  );
});
