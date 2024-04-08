import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/DonorAccount.module.css';
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import phoneNumberFormat from './utilities/phoneNumberFormat.js';
import calenderImage from './images/calendar.jpg';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';
import ajax from './utilities/ajax.js'
import {getAccount, getAccountInfo} from './utilities/account';
import loading from './images/loading.webp';

function DonorAccount() {
  const navigate = useNavigate();
  const toSearchPage = ()=> { navigate("/search"); }
  const toFYP = ()=> { navigate("/fyp"); }

  const [getDate, setDate] = useState(new Date());
  const [getErrorText, setErrorText] = useState("");
  const [getPhoneNumber, setPhoneNumber] = useState("");
  const [getDisplayCalendar, setDisplayCalendar] = useState("none")
  const [getEmail, setEmail] = useState("");
  const [getName, setName] = useState("");
  // charity preference vars
  const [getPref_Hum, setPref_Hum] = useState("");
  const [getPref_Med, setPref_Med] = useState("");
  const [getPref_Env, setPref_Env] = useState("");
  const [getPref_Edu, setPref_Edu] = useState("");
  const [getPref_Soc, setPref_Soc] = useState("");
  const [getPref_Other, setPref_Other] = useState("");

  const [getLoading, setLoading] = useState(true);
  useEffect(()=> {
    (async ()=> {
      const accountInfo = await getAccountInfo();
      setPhoneNumber(phoneNumberFormat(accountInfo["phone number"]));
      setEmail(accountInfo["email"]);
      setName(accountInfo["name"]);
      const date = accountInfo["dob"].replace(/["]/g, "");
      setDate(Date.parse(date));
      setLoading(false);
    })();
  }, [])

  const formatPhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumberFormat(phoneNumber));
  }; 
  const update = async ()=> {
    const phoneNumber = getPhoneNumber.replace(/[-() ]/g, "");
    let account = await getAccount();
    account.account_type = "donor";
    account.email = getEmail;
    account.name = getName;
    account.dob = JSON.stringify(getDate);
    account.phone = phoneNumber;
    const message = await ajax(account, "/addaccountinfo");
    if(message !== "") {
      setErrorText(message);
    }
  }
  const displayCalendar = () => {
    if(getDisplayCalendar === "none") {
      setDisplayCalendar("flex");
    } else {
      setDisplayCalendar("none");
    }
  }
  return (
    <div>
      {getLoading ? 
        <div className={s.Loading}>
          <img src={loading} className={s.Loading_img} ></img>  
        </div> :
      <div className={s.App}>
        <header className={s.App_header}>
        <hr className={s.Bar}/>
        <div className={s.HeaderImageContainer}>
          <div className={s.HeaderImageBG} onClick={()=> toSearchPage()}>
            <img src={search} alt="prop" className={s.HeaderImage}/>
          </div>
        </div>
        <hr className={s.Bar}/>
        <div className={s.HeaderImageContainer}>
          <div className={s.HeaderImageBG} onClick={()=> toFYP()}>
              <img src={home} alt="prop" className={s.HeaderImage}/>
          </div>
        </div>
        <hr className={s.Bar}/>
        <div className={s.MainImageBG}>
          <img src={settings} alt="prop" className={s.MainImage}/>
        </div>
        <hr className={s.Bar}/>
        </header>
        <body className={s.App_body}>
          <div className={s.ItemTitle}>
              <h2>Email</h2>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getEmail} onChange={(event) => setEmail(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Name</h2>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getName} onChange={(event) => setName(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Phone Number </h2>
              {<input className={s.TextField} type="text" placeholder="(XXX) XXX-XXXX" maxLength={14} value={getPhoneNumber} onChange={(event) => formatPhoneNumber(event.target.value)}/>}
          </div>
          <div className={s.ItemTitle}>
            <div className={s.calenderDiv}>
              <h2>Date of Birth:</h2>
              <img src={calenderImage} className={s.calenderImage} alt="prop" onClick={()=> displayCalendar()}/>
            </div>
          </div>
          <div style={{display : getDisplayCalendar}} >
            <style>
              {`.react-calendar__tile--now {
                  background: none;
                }`}
            </style>
            <Calender className={s.CalendarSize} calendarType='gregory' value={getDate} onClickDay={(value)=> setDate(value)}/>
          </div>
          <div className={s.ItemTitle}>
            <div className={s.PreferencesDiv}>
              <h2>Charity Preferences</h2>
              <form>
                <input type = "checkbox" id="pref1" checked={getPref_Hum} className={s.Checkbox} onClick={()=> setPref_Hum(!getPref_Hum)}/>
                <label className={s.PreferencesText} for="pref1">Humanitarian Aid</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref2" checked={getPref_Med} className={s.Checkbox} onClick={()=> setPref_Med(!getPref_Med)}/>
                <label className={s.PreferencesText} for="pref2">Medical</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref3" checked={getPref_Env} className={s.Checkbox} onClick={()=> setPref_Env(!getPref_Env)}/>
                <label className={s.PreferencesText} for="pref3">Environmental</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref4" checked={getPref_Edu} className={s.Checkbox} onClick={()=> setPref_Edu(!getPref_Edu)}/>
                <label className={s.PreferencesText} for="pref4">Education</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref5" checked={getPref_Soc} className={s.Checkbox} onClick={()=> setPref_Soc(!getPref_Soc)}/>
                <label className={s.PreferencesText} for="pref5">Social Justice</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref6" checked={getPref_Other} className={s.Checkbox} onClick={()=> setPref_Other(!getPref_Other)}/>
                <label className={s.PreferencesText} for="pref6">Other</label>
              </form>
            </div>
          </div>
          <p className={s.ErrorText}>{getErrorText}</p>
          <div className={s.ButtonDiv}>
            <button className={s.button} onClick={() => update()}>UPDATE</button>
          </div>
        </body> 
      </div> }
    </div>
    
  );
}

export default DonorAccount;
