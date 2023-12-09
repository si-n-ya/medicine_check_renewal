import {useState} from 'react';
import * as api from "../api/MedicineAPI"
import {useNavigate} from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from "axios";

const useStoreMedicine = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<AxiosError | null>(null);

  return useMutation(api.storeMedicine, {
    onSuccess: () => {
      queryClient.invalidateQueries('medicines')// コンポーネントを再描画
      navigate('/medicine');
    },
    onError: (axiosError: AxiosError) => {
      console.log(axiosError.response);
      setError(axiosError);
    }
  })
}

const useUpdateMedicine = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<AxiosError | null>(null);

  return useMutation(api.updateMedicine, {
    onSuccess: () => {
      queryClient.invalidateQueries('medicines')// コンポーネントを再描画
      navigate('/medicine');
    },
    onError: (axiosError: AxiosError) => {
      console.log(axiosError.response);
      setError(axiosError);
    }
  })
}

type UpdateMedicineRecordParams = {
  id: number;
  date: string | null;
};

const useUpdateRecordMedicine = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<AxiosError | null>(null);

  return useMutation(
    (params: UpdateMedicineRecordParams) => api.updateRecordMedicine(params), // 引数を受け取り、API関数に渡す
    {
    onSuccess: () => {
      queryClient.invalidateQueries('medicines')// コンポーネントを再描画
    },
    onError: (axiosError: AxiosError) => {
      console.log(axiosError.response);
      setError(axiosError);
    }
  })
}

const useDeleteMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation(api.deleteMedicine, {
    onSuccess: () => {// 成功
      // medicines クエリを無効にして、次回のアクセス時に再取得する
      queryClient.invalidateQueries('medicines')
      alert('削除に成功しました。')
    },
    onError: () => {
      alert('削除に失敗しました。')
    }
  })
}

export {
  useStoreMedicine,
  useUpdateMedicine,
  useUpdateRecordMedicine,
  useDeleteMedicine,
}