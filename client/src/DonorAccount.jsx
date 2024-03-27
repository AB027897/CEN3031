import React from 'react';
import {useState} from 'react';
import s from './css/DonorAccount.module.css';
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import phoneNumberFormat from './utilities/phoneNumberFormat.js';
import calenderImage from './images/calendar.jpg';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';
import ajax from './utilities/ajax.js'
import User from './utilities/user.js';

function DonorAccount() {
  const [getDate, setDate] = useState(new Date());
  const [getErrorText, setErrorText] = useState("");
  const [getPhoneNumber, setPhoneNumber] = useState("");
  const [getDisplayCalendar, setDisplayCalendar] = useState("none")
  const formatPhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumberFormat(phoneNumber));
  }; 
  const update = ()=> {
    const phoneNumber = getPhoneNumber.replace(/-/g, "");
  }
  const displayCalendar = () => {
    if(getDisplayCalendar === "none") {
      setDisplayCalendar("flex");
    } else {
      setDisplayCalendar("none");
    }
  }
  return (
    <div className={s.App}>
      <header className={s.App_header}>
        <img src={search} alt="prop" className={s.headerImage}/>
        <hr className={s.bar}></hr>
        <img src={home} alt="prop" className={s.headerImage}/>
        <hr className={s.bar}></hr>
        <img src={settings} alt="prop" className={s.headerImage}/>
      </header>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
            <h2>Email</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..."/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Name</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..."/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Phone Number </h2>
            <input className={s.TextField} type="text" placeholder="000-000-0000" maxLength={14} value={getPhoneNumber} onChange={(event) => formatPhoneNumber(event.target.value)}/>
        </div>
        <div className={s.ItemTitle}>
            <div className={s.calenderDiv}>
              <h2 className={s.ItemTitleText}>Date of Birth:</h2>
              <img src={calenderImage} className={s.calenderImage} alt="prop" onClick={()=> displayCalendar()}/>
            </div>
        </div>
        <div style={{display : getDisplayCalendar}} >
          <Calender calendarType='gregory' onClickDay={(value)=> setDate(value)}/>
        </div>
        <p className={s.ErrorText}>{getErrorText}</p>
        <button className={s.button} onClick={() => update()}>UPDATE</button>
      </body>
    </div>
  );
}

export default DonorAccount;
