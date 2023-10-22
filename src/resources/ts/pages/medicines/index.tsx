import React, {memo} from 'react';
import { Link } from "react-router-dom";
import { useDeleteMedicine } from '../../queries/MedicineQuery';
import { useQuery } from 'react-query';
import { getMedicines } from '../../api/MedicineAPI';
import MedicineList from '../components/MedicineList';

const MedicineListPage = () => {
  console.log('medicine header render');

  const { data: medicines, isLoading, isError } = useQuery('medicines', getMedicines);
  const deleteMedicine = useDeleteMedicine();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>データの読み込みに失敗しました。</div>;
  if (!medicines || medicines.length <= 0) return <div>登録されたお薬はありません。</div>;
  console.log(medicines)

  return (
    <>
    <div className="bg_image_list bg_help">
        <div className="bg_mask">
            <main className="container list_box">
                <div className="flex_container">
                    <h1 className="title_shape title_white">登録リスト</h1>
                    <p className="back_box btn_center">
                        <Link to="/medicine/create" className="btn back">お薬登録</Link>
                    </p>
                </div>
                <MedicineList medicines={medicines} onDelete={deleteMedicine.mutate} />
            </main>
        </div>
    </div>
    </>
  )
}

export default memo(MedicineListPage);
