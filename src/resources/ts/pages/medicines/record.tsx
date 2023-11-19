import React, {useState, useCallback, useRef, memo} from 'react';
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import { getMedicines } from '../../api/MedicineAPI';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayjs from 'dayjs';

const MedicineRecordPage = () => {
  console.log('medicine header render');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const { data: medicines, isLoading, isError } = useQuery('medicines', getMedicines);

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
                    <label htmlFor="check_1" className="name_check">
                        <li className="list_one hover">
                            <input type="checkbox" className="check" id="check_1" />
                            <span className="list name_list">
                                薬名
                            </span>
                            <span className="list num_list">
                                1錠
                            </span>
                            <span className="list time_list">
                                1:00
                            </span>
                        </li>
                    </label>
                </ul>
            </main>
        </div>
    </div>
    </>
  )
}

export default memo(MedicineRecordPage);
