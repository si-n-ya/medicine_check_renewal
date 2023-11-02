import axios from 'axios';
import { Medicine } from '../types/Medicine';

const getMedicines = async() => {
  const { data } = await axios.get('/api/medicines');
  return data.data;
}

const storeMedicine = async (medicine: Medicine) => {
  const { data } = await axios.post<Medicine>(
    `/api/medicines/`,// URL
    medicine// 送信するデータ
  );
  return data;
}

const getMedicine = async(id: number) => {
  const { data } = await axios.get(`/api/medicines/${id}`);
  return data.data;
}

const deleteMedicine = async ( id: number) => {
  const { data } = await axios.delete<Medicine>(
    `/api/medicines/${id}`
  );
  return data;
}

export {
  getMedicines,
  storeMedicine,
  getMedicine,
  deleteMedicine,
}