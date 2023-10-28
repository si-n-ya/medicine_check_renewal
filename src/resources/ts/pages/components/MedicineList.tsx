import React, { memo } from 'react';
import { Medicine as MedicineType } from '../../types/Medicine';
import MedicineItem from './MedicineItem';

interface MedicineListProps {
  medicines: MedicineType[];
  onDelete: (id: number) => void;
}

const MedicineList = ({ medicines, onDelete }: MedicineListProps) => {
  return (
    <form>
        {medicines.map(medicine => (
            <MedicineItem key={medicine.id} medicine={medicine} onDelete={onDelete} />
        ))}
    </form>
  );
};

export default memo(MedicineList);
