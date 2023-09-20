import React, {useEffect, useState} from 'react';

const MedicineCreatePage = () => {
  console.log('medicine create render');
  return (
    <>
    <main className="container form_container margin_top">
    <div className="flex_container">
        <h1 className="title_shape regist_title_black">お薬登録</h1>
        {/* <p className="back_box btn_right">
            <a href="/" className="btn back">メニューへ戻る</a>
        </p> */}
    </div>
    <form className="form margin_top">
        <div className="d_container flexiblebox">
            <dt className="dt regist_dt_bg"><label htmlFor="name">薬の名前</label>
            </dt>
            <dd className="dd">
                <input type="text" name="name" id="name" className="input_text" defaultValue="" />
                <p className="error"></p>
            </dd>
        </div>
        <p className="btn_center"><input type="submit" className="submit  regist_sub_design regist_submit_color" value="登録" />
        </p>
    </form>
</main>
    </>
  )
}

export default MedicineCreatePage