import * as api from "../api/MedicineAPI"
import {useNavigate} from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from "axios";

const useStoreMedicine = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(api.storeMedicine, {
    onSuccess: () => {
      queryClient.invalidateQueries('medicines')// コンポーネントを再描画
      navigate('/medicine');
    },
    onError: (error: AxiosError) => {
      console.log(error.response)
    }
  })
}

export {
  useStoreMedicine
}