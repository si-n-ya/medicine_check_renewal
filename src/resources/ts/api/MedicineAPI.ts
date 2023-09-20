import axios from 'axios';
import { Medicine } from '../types/Medicine';

const storeTask = async (name: string) => {
  const { data } = await axios.post<Medicine>(
    `/api/medicines/`,// URL
    { name: name }// 送信するデータ
  );
  return data;
}

export {
  storeTask
}