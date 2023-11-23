import React, {useState, useCallback, useRef, memo} from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRecordMedicines } from '../../api/MedicineAPI';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayjs from 'dayjs';

const MedicineRecordPage = () => {
  console.log('medicine header render');
  const { date } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const { data: medicines, isLoading, isError } = useQuery('getRecordMedicines', getRecordMedicines);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>データの読み込みに失敗しました。</div>;
  if (!medicines || medicines.length <= 0) return <div>登録されたお薬はありません。</div>;
  console.log(medicines)

  const handleDateClick = useCallback((arg: DateClickArg) => {
    // 日付をクリック時
    setSelectedDate(arg.date);
    navigate(`/record?date=${arg.dateStr}`);
  }, [navigate]);

  const handleDatesSet = useCallback((arg) => {
    // prev・nextをクリック時
    // 月の初日を正しく計算
    const currentView = arg.view;
    const firstDayOfMonth = new Date(currentView.currentStart.getFullYear(), currentView.currentStart.getMonth(), 1);
    setSelectedDate(firstDayOfMonth);
    const startOfMonth = dayjs(firstDayOfMonth).startOf('month').format('YYYY-MM-DD');
    navigate(`/record?date=${startOfMonth}`);
  }, [navigate]);

  const handleTodayClick = useCallback(() => {
    // 「今日」をクリック時
    const today = new Date();
    setSelectedDate(today);
    const todayFormat = dayjs(today).format('YYYY-MM-DD');
    navigate(`/record?date=${todayFormat}`);
    // カレンダーのビューを「今日」の月に切り替え
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  }, [navigate]);

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
                          }}
                          headerToolbar={{
                            left: 'prev,next myTodayButton',
                            center: 'title',
                            right: ''
                          }}
                          dayCellClassNames={(date) => {
                            return date.date.getTime() === selectedDate.getTime() ? 'selected-date' : '';
                        }}
                        // businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
                    />
                </div>
                <ul className="list_all">
                {medicines.map(medicine => (
                    <label htmlFor={`check_${medicine.id}`} className="name_check">
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
            </main>
        </div>
    </div>
    </>
  )
}

export default memo(MedicineRecordPage);
