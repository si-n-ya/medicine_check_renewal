import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useDeleteMedicine } from '../../queries/MedicineQuery';
import { useQuery } from 'react-query';
import { getMedicines } from '../../api/MedicineAPI';
import { Medicine } from '../../types/Medicine';

const MedicineListPage = () => {
  console.log('medicine header render');

  const { data: medicines, isLoading, isError } = useQuery('medicines', getMedicines);
  console.log(medicines)
  const deleteMedicine = useDeleteMedicine();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>データの読み込みに失敗しました。</div>;
  if (!medicines || medicines.length <= 0) return <div>登録されたお薬はありません。</div>;

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
                <form>
                {medicines.map((medicine: Medicine) => (
                    <React.Fragment key={medicine.id}>
                        <div className="medi_list">
                            <a href="">
                                <dt className="list_dt">
                                </dt>
                                <dd className="list_dd">
                                    <p>残り数： {medicine.stock_amount}{medicine.unit?.unit_name}</p>
                                    <p>1回 {medicine.dose_amount}{medicine.unit?.unit_name}</p>
                                </dd>
                            </a>
                            <button type="button" onClick={() => {deleteMedicine.mutate(medicine.id)}} className="btn delete_btn list_delete">削除</button>
                        </div>
                    </React.Fragment>
                ))}
                </form>
            </main>
        </div>
    </div>
    </>
  )
}

export default MedicineListPage