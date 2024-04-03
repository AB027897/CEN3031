import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

import ajax from './utilities/ajax.js'
import Account from './utilities/account.js'
import User from './utilities/user.js';

import s from './css/Search.module.css';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';

function DonorAccount() {
  const navigate = useNavigate();
  const toAccountPage = async ()=> {
    // let user = new User(getEmail, getPassword);
    // let text = await ajax(user, "/loginvalidation", true);
    // let account = new Account(text['localId'], text['token']);
    // let accountInfo = await ajax(account, "/getaccountinfo", true);
    // if(accountInfo['account type'] === 'charity') {
    //   navigate("/charityaccount");
    // } else {
    //   navigate("/donoraccount");
    // }

    // instead do something with 
  }

  const [getSearchText, setSearchText] = useState("");

  const searchQuery = async ()=> {
    // somehow interface here with backend search functionality
  }

  return (
    <div className={s.App}>
      <header className={s.App_header}>
        <hr className={s.Bar}/>
        <div className={s.MainImageBG}>
          <img src={search} alt="prop" className={s.MainImage}/>
        </div>
        <hr className={s.Bar}/>
        <div className={s.HeaderImageContainer}>
          <a className={s.HeaderImageBG} href="/fyp" rel="noopener noreferrer">
            <img src={home} alt="prop" className={s.HeaderImage}/>
          </a>
        </div>
        <hr className={s.Bar}/>
        <div className={s.HeaderImageContainer}>
          <a className={s.HeaderImageBG} href="/donoraccount" onClick={()=> toAccountPage()} rel="noopener noreferrer">
            <img src={settings} alt="prop" className={s.HeaderImage}/>
          </a>
        </div>
        <hr className={s.Bar}/>
      </header>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
            <h2>Search</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..." value={getSearchText} onChange={(event) => setSearchText(event.target.value)}/>
        </div>
        <div className={s.ButtonDiv}>
          <button className={s.button} onClick={() => searchQuery()}>SEARCH</button>
        </div>
      </body>
    </div>
  );
}

export default DonorAccount;
