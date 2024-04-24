// The for-you page displays page recommendations based on selected preferences (for donor users) or the charity's own charity type (for charity users)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { getAccount, getAccountInfo } from './utilities/account.js'
import { checkToken, getToken } from './utilities/token.js';
import ajax from './utilities/ajax.js';
import Account from './utilities/account.js';
import s from './css/FYP.module.css';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';

function DonorAccount() {
  const navigate = useNavigate();
  // variables for showing pages
  const [getRecs, setRecs] = useState([]);
  const [getMax, setMax] = useState(10);
  const [getShow, setShow] = useState("inline-block");
  const [getImageURLs, setImageURLS] = useState([]);
  useEffect(()=> {
    (async ()=> {
      // automatically route to login if no sign in token is detected
      if(!checkToken()) {
        navigate("/login");
      }
      // account data
      const account = await getAccount();
      // determine pages to display based on fetched account preferences/type
      let recommended = await ajax(account, "/getrecs");
      let imageUrls = []
      for(let i=0; i < recommended.length; i++) {
        const charityAccount = new Account(recommended[i]["uuid"], getToken(), "", "", "", "", "", recommended[i]["type"]);
        const images = await ajax(charityAccount, "/getimage");
        imageUrls.push(images[0]);
      } 
      setImageURLS(imageUrls);
      setRecs(recommended);
      getRecs = recommended;
      // hide load more button if there is no more to load
      if(getRecs.length < getMax) {
        setShow("none");
      }
    })();
  }, []);
  // routes to account page (used by navbar)
  const toAccountPage = async ()=> {
    let accountInfo = await getAccountInfo();
    if(accountInfo['account type'] === 'charity') {
      navigate("/charityaccount");
    } else {
      navigate("/donoraccount");
    }
  }
  // routes to search page (used by navbar)
  const toSearchPage = ()=> { navigate("/search"); }

  // used to open a specific charity page option result
  const openPage = async (uuid)=> {
    const token = await ajax(uuid, "/setposttoken");
    localStorage.setItem("Post", token);
    navigate("/pageviewer");
  }
  // generates up to 10 more pages based on preferences/type (used by button)
  const loadMorePages = async ()=> {
    setMax(getMax + 10);
    if(getRecs.length < getMax) {
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
              <img className={s.PageItemImage} src={getImageURLs[i]}/>
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
