import React, {useEffect, useState, useCallback, useMemo, ChangeEvent} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { Medicine } from '../../types/Medicine';
import { DayOfWeek } from '../../types/DayOfWeek';
import { Unit } from '../../types/Unit';
import { useUpdateMedicine } from '../../queries/MedicineQuery';
import { getDaysOfWeek } from '../../api/DayOfWeekAPI';
import { getMedicineUnits } from '../../api/UnitAPI';
import { MedicineInput } from '../components/MedicineInput';
import { MedicineCheckboxGroup } from '../components/MedicineCheckboxGroup';
import { MedicineDoseAmount } from '../components/MedicineDoseAmount';
import { MedicineFormButton } from '../components/MedicineFormButton';
import { updateMedicine } from '../../api/MedicineAPI';

const MedicineEditPage = () => {
  console.log('medicine edit render');

  const { medicineId } = useParams();
  const [formData, setFormData] = useState<Medicine>({
    id: Number(medicineId),
    name: '',
    unit_id: 1,
    start_date: dayjs().format('YYYY-MM-DD'),
    dose_amount: '',
    stock_amount: '',
    day_of_weeks: [],
    times: [],
  });
  const updateMedicine = useUpdateMedicine();
  const { error } = updateMedicine;
  const [daysOfWeek, setDaysOfWeek] = useState<DayOfWeek[]>([]);
  const [medicineUnits, setMedicineUnits] = useState<Unit[]>([]);
  const [isStopping, setIsStopping] = useState(true)
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchMedicine =async () => {
    const { data } = await axios.get(`/api/medicines/${medicineId}`);
    console.log(data.data);
    setInitFormData(data.data)
  }

  const setInitFormData = (data: Medicine) => {
    // フォームの初期値を設定
    setFormData({
      ...data
    });
  }

  const fetchDaysOfWeek = async () => {
    const data = await getDaysOfWeek();
    console.log(data);
    setDaysOfWeek(data)
    // console.log(daysOfWeek)
    setIsStopping(false)
  };

  const fetchMedicineUnits = async () => {
    const data = await getMedicineUnits();
    console.log(data)
    setMedicineUnits(data)
  };

  useEffect(() => {
    fetchMedicine();
    fetchDaysOfWeek();
    fetchMedicineUnits()
    // console.log(daysOfWeek)
  }, []);

  useEffect(() => {
    if (error) {
      // axiosのエラーが発生した場合
      setErrors(error.response.data.errors);
    }
  }, [error]);

  const timeItems = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      return { id: i, day_name: `${i}:00` };
    });
  }, []); // 依存配列を空にし、コンポーネントのマウント時に一度だけ作成する 

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    }, []);// 関数内で直接 formData の状態を参照せず、setFormData で関数を使用しているため、依存配列は空にする
  
  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMedicine.mutate(formData)
  };

  if (isStopping) return

  return (
    <>
    <main className="container form_container margin_top">
    <div className="flex_container">
        <h1 className="title_shape regist_title_black">お薬登録</h1>
    </div>
    <form className="form margin_top" onSubmit={handleSubmit}>
        <MedicineInput
          labelText="お薬名"
          name="name"
          id = "name"
          type="text"
          value={formData.name}
          error={errors.name}
          onChange={handleChange}
        />
        <MedicineCheckboxGroup
          labelText="服用曜日"
          name="day_of_weeks"
          items={daysOfWeek}
          formDataItem={formData.day_of_weeks}
          error={errors.day_of_weeks}
          onChange={handleCheckboxChange}
        />
        <MedicineCheckboxGroup
          labelText="服用時刻"
          name="times"
          items={timeItems}
          formDataItem={formData.times}
          error={errors.times}
          onChange={handleCheckboxChange}
        />
        <MedicineInput
          labelText="使用開始日"
          name="start_date"
          id = "get_date"
          type="date"
          value={formData.start_date}
          error={errors.start_date}
          onChange={handleChange}
        />
        <MedicineDoseAmount
          labelText="服用量"
          units={medicineUnits}
          doseAmount={formData.dose_amount}
          errorDose={errors.dose_amount}
          errorUnit={errors.unit_id}
          onChange={handleChange}
        />
        <MedicineInput
          labelText="在庫数"
          name="stock_amount"
          id="stock"
          type="number"
          value={formData.stock_amount}
          error={errors.stock_amount}
          onChange={handleChange}
        />
        <MedicineFormButton
          buttonText="更新"
        />
    </form>
</main>
    </>
  )
}

export default MedicineEditPage