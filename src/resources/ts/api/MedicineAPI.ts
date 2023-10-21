import axios from 'axios';
import { Medicine } from '../types/Medicine';

const getMedicines = async() => {
  const { data } = await axios.get<Medicine[]>('api/medicines');
  return data;
}

const storeMedicine = async (medicine: Medicine) => {
  const { data } = await axios.post<Medicine>(
    `/api/medicines/`,// URL
    medicine// 送信するデータ
  );
  return data;
}

export {
  getMedicines,
  storeMedicine
}