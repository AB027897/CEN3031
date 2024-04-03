import React from 'react';
import {useState, useEffect} from 'react';

import s from './css/Home.module.css';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';

function DonorAccount() {
  const [getSearchText, setSearchText] = useState("");

  const searchQuery = async ()=> {
    // somehow interface here with backend
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
