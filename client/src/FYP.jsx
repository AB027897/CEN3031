import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { getAccountInfo } from './utilities/account.js'

import s from './css/FYP.module.css';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';

function DonorAccount() {
  const navigate = useNavigate();
  const toAccountPage = async ()=> {
    let accountInfo = await getAccountInfo();
    if(accountInfo['account type'] === 'charity') {
      navigate("/charityaccount");
    } else {
      navigate("/donoraccount");
    }
  }
  const toSearchPage = ()=> { navigate("/search"); }

  const [getSearchText, setSearchText] = useState("");

  const searchQuery = async ()=> {
    // somehow interface here with backend
  }

  return (
    <div className={s.App}>
      <header className={s.App_header}>
        <hr className={s.Bar}/>
        <div className={s.HeaderImageContainer}>
          <div className={s.HeaderImageBG} onClick={()=> toSearchPage()}>
            <img src={search} alt="prop" className={s.HeaderImage}/>
          </div>
        </div>
        <hr className={s.Bar}/>
        <div className={s.MainImageBG}>
            <img src={home} alt="prop" className={s.MainImage}/>
        </div>
        <hr className={s.Bar}/>
        <div className={s.HeaderImageContainer}>
          <div className={s.HeaderImageBG} onClick={()=> toAccountPage()}>
            <img src={settings} alt="prop" className={s.HeaderImage}/>
          </div>
        </div>
        <hr className={s.Bar}/>
      </header>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
            <h2>Search</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..." value={getSearchText} onChange={(event) => setSearchText(event.target.value)}/>
        </div>
        <div className={s.ButtonDiv}>
          <button className={s.button} onClick={() => searchQuery()}>No Search</button>
        </div>
      </body>
    </div>
  );
}

export default DonorAccount;
