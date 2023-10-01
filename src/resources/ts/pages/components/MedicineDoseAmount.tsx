import React, { memo } from "react";
import { Unit } from "../../types/Unit";

interface MedicineDoseAmountProps {
  labelText: string;
//   id: string;
  doseAmount: number | string
  units: Unit[];
  errorDose?: string;
  errorUnit?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const MedicineDoseAmount: React.FC<MedicineDoseAmountProps> = memo((props) => {
  const { labelText, doseAmount, units, errorDose, errorUnit, onChange } = props;
  console.log('MedicineDoseAmount')
  return (
      <div className="d_container flexiblebox">
          <dt className="dt regist_dt_bg"><label htmlFor="dose_amount">{labelText}</label></dt>
          <dd className="dd">
              <input type="number" name="dose_amount" className="input_text" value={doseAmount} onChange={onChange} />
              <select name="unit_id" className="select" onChange={onChange}>
                  {units.map((unit: Unit, index) => (
                    <React.Fragment key={unit.id}>
                      <option key={unit.id} value={unit.id}>{unit.unit_name}</option>
                    </React.Fragment>
                  ))}
              </select>
              {errorDose && <p className="error">{errorDose}</p>}
              {errorUnit && <p className="error">{errorUnit}</p>}
          </dd>
      </div>
  );
});
