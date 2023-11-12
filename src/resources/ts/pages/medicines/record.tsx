import React, {memo} from 'react';
import { Link } from "react-router-dom";
import { useDeleteMedicine } from '../../queries/MedicineQuery';
import { useQuery } from 'react-query';
import { getMedicines } from '../../api/MedicineAPI';

const MedicineRecordPage = () => {
  console.log('medicine header render');

  const { data: medicines, isLoading, isError } = useQuery('medicines', getMedicines);
  const deleteMedicine = useDeleteMedicine();

  return (
    <>
    <div className="bg_image_check bg_help">
        <div className="bg_mask">
            <main className="container check_container margin_top">
                <div className="flex_container">
                    <h1 className="title_shape title_white">お薬の服用記録</h1>
                    <p className="back_box btn_center">
                        <Link to="/" className="btn back">メニューへ戻る</Link>
                    </p>
                </div>
                <ul className="list_all">
                    <label htmlFor="check_1" className="name_check">
                        <li className="list_one hover">
                            <input type="checkbox" className="check" id="check_1" />
                            <span className="list name_list">
                                薬名
                            </span>
                            <span className="list num_list">
                                1錠
                            </span>
                            <span className="list time_list">
                                1:00
                            </span>
                        </li>
                    </label>
                </ul>
            </main>
        </div>
    </div>
    </>
  )
}

export default memo(MedicineRecordPage);
