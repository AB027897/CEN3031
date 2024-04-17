import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { getAccount, getAccountInfo } from './utilities/account.js'
import { checkToken } from './utilities/token.js';
import ajax from './utilities/ajax.js';

import s from './css/FYP.module.css';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';

// temporary placeholder images before actual images are implemented from pages
import hands from './images/Logo_Hands_Crop.png'
import globe from './images/Logo_Earth.png';


function DonorAccount() {
  const navigate = useNavigate();
  const [getRecs, setRecs] = useState([]);
  useEffect(()=> {
    (async ()=> {
      if(!checkToken()) {
        navigate("/login");
      }
      const account = await getAccount();
      const recommended = await ajax(account, "/getrecs");
      setRecs(recommended);
    })();
  }, []);

  const toAccountPage = async ()=> {
    let accountInfo = await getAccountInfo();
    if(accountInfo['account type'] === 'charity') {
      navigate("/charityaccount");
    } else {
      navigate("/donoraccount");
    }
  }
  const toSearchPage = ()=> { navigate("/search"); }

  const openPage = async (uuid)=> {
    const token = await ajax(uuid, "/setposttoken");
    localStorage.setItem("Post", token);
    navigate("/pageviewer");
  }
  const loadMorePages = async ()=> {
    // interface with backend to gather more pages to load onto this page (or a new page)
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
        {getRecs.map((rec, i)=> (
          <div className={s.PageItem} onClick={()=>openPage(rec["uuid"])}>
            <div className={s.PageItemImageDiv}>
              <img className={s.PageItemImage} src={globe}/>
            </div>
            <div className={s.PageItemTextDiv}>
              <div className={s.PageItemTitle}>{rec["title"]}</div>
              <div className={s.PageItemBlurb}>{rec["preview_caption"]}</div>
            </div>
          </div>
        ))}
        <div className={s.ButtonDiv}>
          <button className={s.button} onClick={() => loadMorePages()}>LOAD MORE</button>
        </div>
      </body>
    </div>
  );
}

export default DonorAccount;
