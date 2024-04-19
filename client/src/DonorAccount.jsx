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
import {checkToken} from './utilities/token.js';
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
  const [getPreference, setPreference] = useState(new Set());

  const [getLoading, setLoading] = useState(true);

  // first Time Configure
  const [getConfigured, setConfigured] = useState(false);

  useEffect(()=> {
    (async ()=> {
      if(!checkToken()) {
        navigate("/login");
      }
      const accountInfo = await getAccountInfo();
      setPhoneNumber(phoneNumberFormat(accountInfo["phone number"]));
      setEmail(accountInfo["email"]);
      setName(accountInfo["name"]);
      const date = accountInfo["dob"].replace(/["]/g, "");
      setDate(Date.parse(date));
      try {
        for(let i=0; i < accountInfo["preferences"].length; i++) {
          handlePreferences(accountInfo["preferences"][i]);
        }
      } catch(error) {
        
      }

      // set first time configure state
      if(localStorage.getItem('newUser')) {
        setConfigured(false);
      }
      else setConfigured(true);

      // exit loading state
      setLoading(false);
    })();
  }, [])

  const formatPhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumberFormat(phoneNumber));
  }; 
  const update = async ()=> {
    
    let account = await getAccount();
    account.account_type = "donor";

    account.email = getEmail;

    // Name error checking
    if(getName.length == 0) {
      setErrorText("Name is required");
      return;
    }
    account.name = getName;

    // phone number error checking
    const phoneNumber = getPhoneNumber.replace(/[-() ]/g, "");
    if(phoneNumber.length != 10) {
      setErrorText("Phone number must be valid");
      return;
    }
    account.phone = phoneNumber;

    // Date of Birth error checking
    if(JSON.stringify(getDate) == "null" && !getConfigured) {
      setErrorText("Date of birth is required");
      return;
    }
    account.dob = JSON.stringify(getDate);

    // Preferences error checking
    // if none selected prompt with "At least one preference option must be selected"
    if(Array.from(getPreference).length === 0) {
      setErrorText("At least one preference must be selected");
      return;
    }
    account.preferences = Array.from(getPreference);

    // Email error checking AND account info updating
    const message = await ajax(account, "/addaccountinfo");
    if(message !== "") { // email is only error remaining/possible
      setErrorText("Email address must be valid");
      return;
    }

    // no error if it reached this state
    setErrorText("");
    localStorage.removeItem("newUser");
    if(getConfigured == false) {
      navigate("/fyp")
    }
    setConfigured(true);
  }
  const logout = async ()=> {
    // route to home
    localStorage.clear();
    navigate("/");
  }
  const displayCalendar = () => {
    if(getDisplayCalendar === "none") {
      setDisplayCalendar("flex");
    } else {
      setDisplayCalendar("none");
    }
  }
  const handlePreferences = (newPreference) => {
    getPreference.has(newPreference) ? setPreference(prevPreference => {const newSet = new Set(prevPreference); newSet.delete(newPreference); return newSet;}) : setPreference(prevPreference => new Set(prevPreference).add(newPreference));
  }
  return (
    <div>
      {getLoading ? 
        <div className={s.Loading}>
          <img src={loading} className={s.Loading_img} ></img>  
        </div> :
      <div className={s.App}>
        <header className={s.App_header}>
        {getConfigured ?
          <>
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
          </> :
          <div className={s.HeaderText}>Account Configuration</div>}
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
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref1" checked={getPreference.has("Humanitarian Aid")} className={s.Checkbox} onClick={()=> handlePreferences("Humanitarian Aid")}/>
                <label className={s.PreferencesText} for="pref1">Humanitarian Aid</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref2" checked={getPreference.has("Medical")} className={s.Checkbox} onClick={()=> handlePreferences("Medical")}/>
                <label className={s.PreferencesText} for="pref2">Medical</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref3" checked={getPreference.has("Environmental")} className={s.Checkbox} onClick={()=> handlePreferences("Environmental")}/>
                <label className={s.PreferencesText} for="pref3">Environmental</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref4" checked={getPreference.has("Education")} className={s.Checkbox} onClick={()=> handlePreferences("Education")}/>
                <label className={s.PreferencesText} for="pref4">Education</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref5" checked={getPreference.has("Social Justice")} className={s.Checkbox} onClick={()=> handlePreferences("Social Justice")}/>
                <label className={s.PreferencesText} for="pref5">Social Justice</label>
                <hr className={s.PrefSeparator}/>
                <input type = "checkbox" id="pref6" checked={getPreference.has("Other")} className={s.Checkbox} onClick={()=> handlePreferences("Other")}/>
                <label className={s.PreferencesText} for="pref6">Other</label>
              </form>
            </div>
          </div>
          <p className={s.ErrorText}>{getErrorText}</p>
          <div className={s.ButtonDiv}>
            <button className={s.button} onClick={() => update()}>{getConfigured ? <>UPDATE</> : <>SUBMIT</>}</button>
          </div>
          {getConfigured ? 
          <><hr className={s.BarSep}/>
          <button className={s.button2} onClick={() => logout()}>Log Out</button></> 
          : <></>}
        </body> 
      </div> }
    </div>
    
  );
}

export default DonorAccount;
