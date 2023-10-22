import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { getMedicines } from '../../api/MedicineAPI';
import { Medicine } from '../../types/Medicine';

const MedicineListPage = () => {
  console.log('medicine header render');

  const [isStopping, setIsStopping] = useState(true)
  const [medicines, setMedicines] = useState<Medicine[]>([])

  const fetchMedicines = async () => {
    const data = await getMedicines();
    console.log(data)
    setMedicines(data)
    setIsStopping(false)
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  if (isStopping) return

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
                            <button type="button" className="btn delete_btn list_delete">削除</button>
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