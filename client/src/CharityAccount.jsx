import React from 'react';
import {useState} from 'react';
import s from './css/CharityAccount.module.css';
import phoneNumberFormat from './utilities/phoneNumberFormat.js';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';
import ajax from './utilities/ajax.js'
import User from './utilities/user.js';

function CharityAccount() {
  const [getErrorText, setErrorText] = useState("");
  const [getPhoneNumber, setPhoneNumber] = useState("");
  const formatPhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumberFormat(phoneNumber));
  }; 
  const update = ()=> {
    const phoneNumber = getPhoneNumber.replace(/-/g, "");
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
            <h2>Organization Name</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..."/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Phone Number </h2>
            <input className={s.TextField} type="text" placeholder="000-000-0000" maxLength={14} value={getPhoneNumber} onChange={(event) => formatPhoneNumber(event.target.value)}/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Charity Type</h2>
            <select className={s.Dropdown}>
                <option className={s.TextField}>Select option...</option>
                <option className={s.TextField}> Humanitarian Aid</option>
                <option className={s.TextField}>Medical</option>
                <option className={s.TextField}>Environmental</option>
                <option className={s.TextField}>Education</option>
                <option className={s.TextField}>Social Justice</option>
                <option className={s.TextField}>Other</option>
            </select>
        </div>
        <p className={s.ErrorText}>{getErrorText}</p>
        <button className={s.button} onClick={() => update()}>UPDATE</button>
        <div className={s.Customize}>
            <h2>Customize Charity Page</h2>
        </div>
        <div>
            <button className={s.SmallButton}>Preview</button>
            <button className={s.SmallButton}>Edit</button>
        </div>
      </body>
    </div>
  );
}

export default CharityAccount;
