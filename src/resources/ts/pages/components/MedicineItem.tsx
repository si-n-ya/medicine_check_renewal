import React, { memo } from 'react';
import { Link } from "react-router-dom";
import { Medicine as MedicineType } from '../../types/Medicine';

interface MedicineProps {
  medicine: MedicineType;
  onDelete: (id: number) => void;
}

const MedicineItem = ({ medicine, onDelete }: MedicineProps) => {
  return (
    <div className="medi_list">
        <Link to={`/medicine/edit/${medicine.id}`}>
            <dt className="list_dt"></dt>
            <dd className="list_dd">
                <p>残り数： {medicine.stock_amount}{medicine.unit?.unit_name}</p>
                <p>1回 {medicine.dose_amount}{medicine.unit?.unit_name}</p>
            </dd>
        </Link>
        <button type="button" onClick={() => onDelete(medicine.id)} className="btn delete_btn list_delete">削除</button>
    </div>
  );
};

export default memo(MedicineItem);
