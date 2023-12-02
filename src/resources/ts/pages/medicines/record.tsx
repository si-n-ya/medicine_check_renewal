import React, {useState, useEffect, useCallback, useRef, memo} from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRecordMedicines } from '../../api/MedicineAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayjs from 'dayjs';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Medicine } from '../../types/Medicine';

const MedicineRecordPage = () => {
  console.log('medicine header render');
  const locationSearch = useLocation().search;
  const urlSearchParams = new URLSearchParams(locationSearch);
  const dateParam = urlSearchParams.get('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  // const { data: medicines, isLoading, isError } = useQuery('getRecordMedicines', getRecordMedicines);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // const getRecordMedicines = async(date: string | undefined) => {
  //   const { data } = await axios.get('/api/medicinesOfday', {
  //     params: {
  //       date: date
  //     }
  //   });
  //   return data.data;
  // }

  useEffect(() => {
    // 初期表示時に、URLパラメータのdateの日付からselectedDateを設定
    const parsedDate = dateParam ? new Date(dateParam) : new Date();
    setSelectedDate(parsedDate);
  }, [])

  useEffect(() => {
    const init = async () => {
      axios
        .get('/api/medicinesOfday', {
          params: {
            date: dateParam
          }
        })
        .then((response: AxiosResponse) => {
          console.log('成功');
          console.log(response.data);
          setMedicines(response.data.data);
          setIsLoading(false)
        })
        .catch((err: AxiosError) =>  {
          console.log(err.response)
          console.log(err)
        })
        // .finally(() => setIsLoading(false));
    };
    init();
  }, [dateParam]);

  const handleDateClick = useCallback((arg: DateClickArg) => {
    // 日付をクリック時
    setSelectedDate(arg.date);
    navigate(`/record?date=${arg.dateStr}`);
  }, [navigate]);

  const handleDatesSet = useCallback((arg) => {
    console.log('handleDatesSet実行')
    // prev・nextをクリック時
    // 月の初日を正しく計算

      // 初期表示時にhandleDatesSetが実行され、URLパラメータがその月の初日に変更されてしまうため、初期レンダリング時には何もしない
      console.log('isInitialRenderの値', isInitialRender)
    if (isInitialRender) {
      // TODO 前後のカレンダーに移動した際に、「isInitialRender」が「true」になってしまうため、この分岐に入ってしまい、URLパラメータが変わらない。
      setIsInitialRender(false);
      return;
    }
    const currentView = arg.view;
    const firstDayOfMonth = new Date(currentView.currentStart.getFullYear(), currentView.currentStart.getMonth(), 1);
    setSelectedDate(firstDayOfMonth);
    const startOfMonth = dayjs(firstDayOfMonth).startOf('month').format('YYYY-MM-DD');
    navigate(`/record?date=${startOfMonth}`);
  }, [navigate]);

  const handleTodayClick = useCallback(() => {
    console.log('handleTodayClickが実行')
    // 「今日」をクリック時
    const today = new Date();
    setSelectedDate(today);
    const todayFormat = dayjs(today).format('YYYY-MM-DD');
    navigate(`/record?date=${todayFormat}`);
    // カレンダーのビューを「今日」の月に切り替え
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>データの読み込みに失敗しました。</div>;
  console.log(medicines)

  return (
    <>
    <div className="bg_image_check bg_help">
        <div className="bg_mask">
            <main className="container check_container margin_top">
                <div className="flex_container">
                    <h1 className="title_shape title_white">お薬の服用記録</h1>
                    <p className="back_box btn_center">
                        <Link to="/" className="btn back">メニューへ戻る</Link>
                    </p>
                </div>
                <div style={{ backgroundColor: '#fff' }}>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        locales={allLocales}
                        locale="ja"
                        dateClick={handleDateClick}
                        datesSet={handleDatesSet}
                        customButtons={{
                            myTodayButton: {
                              text: '今日',
                              click: handleTodayClick,
                            },
                            // prev: {
                            //   text: '<',
                            //   click: handleDatesSet,
                            // },
                            // next: {
                            //   text: '>',
                            //   click: handleDatesSet,
                            // },
                          }}
                          headerToolbar={{
                            left: 'prev,next myTodayButton',
                            center: 'title',
                            right: ''
                          }}
                          dayCellClassNames={(date) => {
                            // dayjsにより、セルの日付と選択した日付を比較し、背景色のクラスを付与
                            const dateStr = dayjs(date.date).format('YYYY-MM-DD');
                            const selectedDateStr = dayjs(selectedDate).format('YYYY-MM-DD');
                            return dateStr === selectedDateStr ? 'selected-date' : '';
                        }}
                        // businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
                    />
                </div>
                {medicines.length > 0 ? (
                <ul className="list_all">
                {medicines.map(medicine => (
                    <label htmlFor={`check_${medicine.id}`} className="name_check" key={medicine.id}>
                        <li className="list_one hover">
                            <input type="checkbox" className="check" id={`check_${medicine.id}`} />
                            <span className="list name_list">
                                {medicine.name}
                            </span>
                            <span className="list num_list">
                                {medicine.dose_amount}{medicine.unit?.unit_name}
                            </span>
                            <span className="list time_list">
                                1:00
                                {medicine.medicine_times?.time_of_day}
                            </span>
                        </li>
                    </label>
                 ))}
                </ul>
                ) : (
                  <div>登録されたお薬はありません。</div>
                )}
            </main>
        </div>
    </div>
    </>
  )
}

export default memo(MedicineRecordPage);
