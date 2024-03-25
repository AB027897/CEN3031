import React from 'react';
import {useState} from 'react';
import s from './css/Donor-Account.module.css';
import Calender from 'react-calendar';
import ajax from './utilities/ajax.js'
import User from './utilities/user.js';

function DonorAccount() {
const [getErrorText, setErrorText] = useState("");
  return (
    <div className={s.App}>
      <header className={s.App_header}>
        <h1 className={s.Title}></h1>
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
        <p className={s.ErrorText}>{getErrorText}</p>
        <Calender/>
        <button className={s.button}>Update</button>
      </body>
    </div>
  );
}

export default DonorAccount;
