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
import globe from './images/Logo_Earth.png';


function DonorAccount() {
  const navigate = useNavigate();
  const [getRecs, setRecs] = useState([]);
  const [getMax, setMax] = useState(10);
  const [getShow, setShow] = useState("inline-block");
  useEffect(()=> {
    (async ()=> {
      if(!checkToken()) {
        navigate("/login");
      }
      const account = await getAccount();
      const recommended = await ajax(account, "/getrecs");
      setRecs(recommended);
      if(getRecs.length < getMax) {
        setShow("none");
      }
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
    setMax(getMax + 10);
    if(getRecs.length < setMax) {
      setShow("none");
    }
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
          i < getMax ? (
          <div className={s.PageItem} onClick={()=>openPage(rec["uuid"])}>
            <div className={s.PageItemImageDiv}>
              <img className={s.PageItemImage} src={globe}/>
            </div>
            <div className={s.PageItemTextDiv}>
              <div className={s.PageItemTitle}>{rec["title"]}</div>
              <div className={s.PageItemBlurb}>{rec["preview_caption"]}</div>
            </div>
          </div>) : null
        ))}
        <div className={s.ButtonDiv}>
          <button className={s.button} style={{"display": getShow}} onClick={() => loadMorePages()}>LOAD MORE</button>
        </div>
      </body>
    </div>
  );
}

export default DonorAccount;
