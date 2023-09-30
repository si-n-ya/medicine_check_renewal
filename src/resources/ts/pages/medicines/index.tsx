import React from 'react';
import { Link } from "react-router-dom";

const MedicineListPage = () => {
  console.log('medicine header render');
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
            </main>
        </div>
    </div>
    </>
  )
}

export default MedicineListPage