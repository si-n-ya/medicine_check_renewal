import React, {useEffect, useState, ChangeEvent} from 'react';
import dayjs from 'dayjs';
import { Medicine } from '../../types/Medicine';
import { DayOfWeek } from '../../types/DayOfWeek';
import { Unit } from '../../types/Unit';
import { useStoreMedicine } from '../../queries/MedicineQuery';
import { getDaysOfWeek } from '../../api/DayOfWeekAPI';
import { getMedicineUnits } from '../../api/UnitAPI';

const MedicineCreatePage = () => {
  console.log('medicine create render');

  const [formData, setFormData] = useState<Medicine>({
    name: '',
    unit_id: 1,
    start_date: dayjs().format('YYYY-MM-DD'),
    dose_amount: '',
    stock_amount: '',
    day_of_weeks: [],
    times: [],
  });
  const storeMedicine = useStoreMedicine();
  const { error } = storeMedicine;
  const [daysOfWeek, setDaysOfWeek] = useState<DayOfWeek[]>([]);
  const [medicineUnits, setMedicineUnits] = useState<Unit[]>([]);
  const [isStopping, setIsStopping] = useState(true)
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchDaysOfWeek = async () => {
    const data = await getDaysOfWeek();
    console.log(data);
    setDaysOfWeek(data)
    console.log(daysOfWeek)
    setIsStopping(false)
  };

  const fetchMedicineUnits = async () => {
    const data = await getMedicineUnits();
    console.log(data)
    setMedicineUnits(data)
  };

  useEffect(() => {
    fetchDaysOfWeek();
    fetchMedicineUnits()
    console.log(daysOfWeek)
  }, []);

  useEffect(() => {
    if (error) {
      // axiosのエラーが発生した場合
      setErrors(error.response.data.errors);
    }
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const name = e.target.name;  // チェックボックスの name 属性を取得
  
    setFormData(prevState => {
      const existingValues = prevState[name] || [];  // 既存の値を取得

      if (e.target.checked) {
        return { ...prevState, [name]: [...existingValues, value] };
      } else {
        return { ...prevState, [name]: existingValues.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    storeMedicine.mutate(formData)
  };

  if (isStopping) return

  return (
    <>
    <main className="container form_container margin_top">
    <div className="flex_container">
        <h1 className="title_shape regist_title_black">お薬登録</h1>
    </div>
    <form className="form margin_top" onSubmit={handleSubmit}>
        <div className="d_container flexiblebox">
            <dt className="dt regist_dt_bg"><label htmlFor="name">お薬名</label>
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
                {errors.name && <p className="error">{errors.name}</p>}
            </dd>
        </div>
        <div className="d_container flexiblebox">
            <dt className="dt regist_dt_bg">服用曜日</dt>
            <dd className="dd week_dd">
               <div className="check_layout">
               {daysOfWeek.map((day: DayOfWeek, index) => (
                <React.Fragment key={day.id}>
                  <input
                    type="checkbox"
                    name="day_of_weeks"
                    id={day.id.toString()}
                    className="regist_week_check"
                    onChange={handleCheckboxChange}
                    checked={formData.day_of_weeks.includes(day.id)}
                    value={day.id}
                  />
                  <label htmlFor={day.id.toString()}>{day.day_name}</label>
                </React.Fragment>
              ))}
              </div>
              {errors.day_of_weeks && <p className="error">{errors.day_of_weeks}</p>}
            </dd>
        </div>
        <div className="d_container flexiblebox">
        <dt className="dt regist_dt_bg">服用時刻</dt>
            <dd className="dd">
              <div className="check_layout">
              {Array.from({ length: 24 }, (_, i) => i).map((val, index) => (
                <React.Fragment key={val}>
                  <input
                    type="checkbox"
                    name="times"
                    id={`time${val}`}
                    value={val}
                    checked={formData.times.includes(val)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`time${val}`}>{val}:00</label>
                </React.Fragment>
              ))}
              </div>
              {errors.times && <p className="error">{errors.times}</p>}
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
                {errors.start_date && <p className="error">{errors.start_date}</p>}
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
               {medicineUnits.map((unit: Unit, index) => (
                  <React.Fragment key={unit.id}>
                    <option value={unit.id}>{unit.unit_name}</option>
                  </React.Fragment>
                ))}
                </select>
                {errors.dose_amount && <p className="error">{errors.dose_amount}</p>}
                {errors.unit_id && <p className="error">{errors.unit_id}</p>}
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
                {errors.stock_amount && <p className="error">{errors.stock_amount}</p>}
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