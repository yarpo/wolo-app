import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'react-native-big-calendar';
import fetchUser from '../../Utils/fetchUser';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth';
import { URLS } from '../../config';
import { HiCalendar, HiQuestionMarkCircle } from "react-icons/hi";
import { Tooltip } from "flowbite-react";

import '../../styles/calendar.scss';

const CalendarView = () => {
    const { t } = useTranslation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [userShifts, setUserShifts] = useState([]);
    const [userShiftsPast, setUserShiftsPast] = useState([]);
    const [userShiftsReserve, setUserShiftsReserve] = useState([]);
    const [id, setId] = useState(null);
    const eventName = `eventName${localStorage.getItem('i18nextLng').toUpperCase()}`;

    useEffect(() => {
        fetchUser().then(data => {
          if (data) {
            setId(data.id);

            if(id){
                fetchDataWithAuth(`${URLS.USER_EVENTS_CURRENT}`, setUserShifts, localStorage.getItem('token'));
                fetchDataWithAuth(`${URLS.USER_EVENTS_PAST}`, setUserShiftsPast, localStorage.getItem('token'));
                fetchDataWithAuth(`${URLS.USER_EVENTS_RESERVE}`, setUserShiftsReserve, localStorage.getItem('token'));
            }
          }
        })
      }, [id]);

    const monthNames = [
        t('january'), 
        t('february'), 
        t('march'), 
        t('april'), 
        t('may'), 
        t('june'),
        t('july'), 
        t('august'), 
        t('september'), 
        t('october'), 
        t('november'), 
        t('december')
    ];      

    const eventsFromUserShifts = userShifts.length > 0 ? userShifts.map(event => ({
        title: event[eventName],
        start: new Date(event.date + 'T' + event.startTime),
        end: new Date(event.date + 'T' + event.endTime),
        color: '#3769cb'
    })) : [];

    const eventsFromUserShiftsPast = userShiftsPast.length > 0 ? userShiftsPast.map(event => ({
        title: event[eventName],
        start: new Date(event.date + 'T' + event.startTime),
        end: new Date(event.date + 'T' + event.endTime),
        color: '#414754'
    })) : [];

    const eventsFromUserShiftsReserve = userShiftsReserve.length > 0 ? userShiftsReserve.map(event => ({
        title: event[eventName],
        start: new Date(event.date + 'T' + event.startTime),
        end: new Date(event.date + 'T' + event.endTime),
        color: '#fbcc71',
    })) : [];

    const events = [...eventsFromUserShifts, ...eventsFromUserShiftsReserve, ...eventsFromUserShiftsPast];

    const goToPreviousMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const handleDateChange = ([start, _]) => {
        if (currentDate.getTime() !== start.getTime()) {
            setCurrentDate(start);
        }
    };

    return (
        <div className='calendar-page-container'>
            <div className='calendar-header'>
                <h1 className='calendar-page-text'><HiCalendar /> {t('yourCalendar')}</h1>
                <Tooltip content={t('calendarTip')} style="light" placement="bottom" className='calendar-page-tooltip'>
                    <HiQuestionMarkCircle  className='calendar-page-help-svg' />
                </Tooltip>
            </div>
            <div className='calendar-controls'>
                <button className='confirm_button' onClick={goToPreviousMonth}> {t('previousMonth')}</button>
                <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button className='confirm_button' onClick={goToNextMonth}>{t('nextMonth')}</button>
            </div>
            <div>
                <Calendar 
                    events={events} 
                    height={600} 
                    mode='month'
                    weekStartsOn={1}
                    showAllDayEventCell={true}
                    date={currentDate}
                    onChangeDate={handleDateChange}
                    eventCellStyle={(event) => ({backgroundColor: event.color})}
                />
            </div>
        </div>
    );
};

export default CalendarView;
