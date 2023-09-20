import React, {useEffect, useState, ChangeEvent} from 'react';
import dayjs from 'dayjs';
import { Medicine } from '../../types/Medicine';
import { useStoreMedicine } from '../../queries/MedicineQuery';

const MedicineCreatePage = () => {
  console.log('medicine create render');

  const [formData, setFormData] = useState<Medicine>({
    name: '',
    unit_id: 1,
    start_date: dayjs().format('YYYY-MM-DD'),
    dose_amount: '',
    stock_amount: '',
  });
  const storeMedicine = useStoreMedicine()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    storeMedicine.mutate(formData)
  };

  return (
    <>
    <main className="container form_container margin_top">
    <div className="flex_container">
        <h1 className="title_shape regist_title_black">お薬登録</h1>
        {/* <p className="back_box btn_right">
            <a href="/" className="btn back">メニューへ戻る</a>
        </p> */}
    </div>
    <form className="form margin_top" onSubmit={handleSubmit}>
        <div className="d_container flexiblebox">
            <dt className="dt regist_dt_bg"><label htmlFor="name">薬の名前</label>
            </dt>
            <dd className="dd">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input_text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <p className="error"></p>
            </dd>
        </div>
        <div className="d_container flexiblebox">
            <dt className="dt regist_dt_bg"><label htmlFor="start_date">使用開始日</label>
            </dt>
            <dd className="dd">
                <input
                  type="date"
                  name="start_date"
                  id="get_date"
                  className="input_text"
                  value={formData.start_date}
                  onChange={handleChange}
                />
            </dd>
        </div>
        <div className="d_container flexiblebox">
            <dt className="dt regist_dt_bg"><label htmlFor="dose_amount">服用量</label></dt>
            <dd className="dd">
                <input
                  type="number"
                  name="dose_amount"
                  className="input_text"
                  value={formData.dose_amount}
                  onChange={handleChange}
                />
                <select
                  name="unit_id"
                  className="select"
                  value={formData.unit_id}
                  onChange={handleChange}
                >
                    <option value="1">錠</option>
                    <option value="2">g</option>
                    <option value="3">ml</option>
                    <option value="4">包</option>
                </select>
            </dd>
        </div>
        <div className="flexiblebox">
            <dt className="dt regist_dt_bg"><label htmlFor="stock_amount">在庫数</label></dt>
            <dd className="dd">
                <input
                  type="number"
                  name="stock_amount"
                  id="stock"
                  className="input_text"
                  value={formData.stock_amount}
                  onChange={handleChange}
                />
            </dd>
        </div>
        <p className="btn_center"><input type="submit" className="submit regist_sub_design regist_submit_color" value="登録" />
        </p>
    </form>
</main>
    </>
  )
}

export default MedicineCreatePage