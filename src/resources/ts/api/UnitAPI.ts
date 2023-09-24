import axios from 'axios';

const getMedicineUnits = async () => {
  const { data } = await axios.get(
    `/api/medicineUnits/`,
  );
  return data.data;
}

export {
  getMedicineUnits
}