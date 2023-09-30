import axios from 'axios';

const getDaysOfWeek = async () => {
  const { data } = await axios.get(
    `/api/daysOfWeek/`,
  );
  return data.data;
}

export {
  getDaysOfWeek
}