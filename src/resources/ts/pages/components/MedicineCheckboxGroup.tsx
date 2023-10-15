import React, { memo } from "react";
import { MedicineCheckboxItem } from "./MedicineCheckboxItem";

interface MedicineCheckboxGroupProps {
    items: { id: number; day_name: string; }[];
    name: string;
    labelText: string;
    formDataItem: [];
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MedicineCheckboxGroup: React.FC<MedicineCheckboxGroupProps> = memo((props) => {
    console.log('MedicineCheckboxGroup')
    const { items, name, labelText, formDataItem, error, onChange } = props;
    return (
        <div className="d_container flexiblebox">
            <dt className="dt regist_dt_bg">{labelText}</dt>
            <dd className="dd">
                <div className="check_layout">
                {items.map((item) => (
                    <React.Fragment key={item.id}>
                        <MedicineCheckboxItem 
                            id={item.id}
                            name={name}
                            labelText={item.day_name}
                            value={item.id}
                            checked={formDataItem.includes(item.id)}
                            onChange={onChange}
                        />
                    </React.Fragment>
                ))}
                </div>
                {error && <p className="error">{error}</p>}
            </dd>
        </div>
    );
});
