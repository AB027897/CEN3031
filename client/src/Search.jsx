// the search page is used by users to search through the database of charity pages
// search queries use typesense to detect any instances of the text search or something similar in the charity's page.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { getAccount, getAccountInfo } from './utilities/account.js';
import { checkToken, getToken } from './utilities/token.js';
import ajax from './utilities/ajax.js';
import Account from './utilities/account.js'
import s from './css/Search.module.css';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';

function DonorAccount() {
  const navigate = useNavigate();
  // used for fetching more pages
  const [getMax, setMax] = useState(10);
  const [getQuery, setQuery] = useState([]);
  const [getImageURLS, setImageURLS] = useState([]);
  const [getShow, setShow] = useState("inline-block");
  const [getSearch, setSearch] = useState(false);

  useEffect(()=> {
    (async ()=> {
      // automatically route to login if no login token detected
      if(!checkToken()) {
        navigate("/login");
      }
      // detch account data
      const account = await getAccount();
      // fetch recommendations based on account prefs/type - used to generate pages like for-you page before search query is sent
      let recommended = await ajax(account, "/getrecs");
      let imageUrls = []
      for(let i=0; i < recommended.length; i++) {
        const charityAccount = new Account(recommended[i]["uuid"], getToken(), "", "", "", "", "", recommended[i]["type"]);
        const images = await ajax(charityAccount, "/getimage");
        imageUrls.push(images[0]);
      } 
      setImageURLS(imageUrls);
      setQuery(recommended);
      getQuery = recommended;
      // hide show more button if there are no more pages to show
      if(getQuery.length < getMax) {
        setShow("none");
      }
    })();
  }, []);

  // routes to account page (used in navbar)
  const toAccountPage = async ()=> {
    let accountInfo = await getAccountInfo();
    if(accountInfo['account type'] === 'charity') {
      navigate("/charityaccount");
    } else {
      navigate("/donoraccount");
    }
  }
  // routes to for-you page (used in navbar)
  const toFYP = ()=> { navigate("/fyp"); }

  // used to open a specific charity page that resulted from the search query
  const openPage = async (uuid)=> {
    const token = await ajax(uuid, "/setposttoken");
    localStorage.setItem("Post", token);
    navigate("/pageviewer");
  }
  // loads up to 10 more pages that fit the search query (used by button)
  const loadMorePages = async ()=> {
    setMax(getMax + 10);
    if(getQuery.length < getMax) {
      setShow("none");
    }
  }

  // search text data
  const [getSearchText, setSearchText] = useState("");
  const searchQuery = async ()=> {
    // waits for repsonse from typesense
    const response = await ajax(getSearchText, "/typesense");
    setQuery(response["hits"]);
    let imageUrls = [];
    for(let i=0; i < response["hits"].length; i++) {
      const charityAccount = new Account(response["hits"][i]["document"]["id"], getToken(), "", "", "", "", "", response["hits"][i]["document"]["charity_type"]);
      console.log(charityAccount);
      const images = await ajax(charityAccount, "/getimage");
      imageUrls.push(images[0]);
    } 
    // updates images based on results
    setImageURLS(imageUrls);
    setSearch(true);
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
          <div className={s.HeaderImageBG} onClick={()=> toFYP()}>
            <img src={home} alt="prop" className={s.HeaderImage}/>
          </div>
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
        <div className={s.SearchDiv}>
          <input className={s.TextField} type="text" placeholder="Search..." value={getSearchText} onChange={(event) => setSearchText(event.target.value)}/>
          <div className={s.SearchButton}>
            <img className={s.SearchImage} src={search} onClick={()=>searchQuery()}/>
          </div>
        </div>        
        {getQuery.map((query, i)=> (
          i < getMax ? (
          <div className={s.PageItem} onClick={()=>openPage(!getSearch ? query["uuid"] : query["document"]["id"])}>
            <div className={s.PageItemImageDiv}>
              <img className={s.PageItemImage} src={getImageURLS[i]}/>
            </div>
            <div className={s.PageItemTextDiv}>
              <div className={s.PageItemTitle}>
                {!getSearch ? query["title"] : query["document"]["charity_name"]}
              </div>
              <div className={s.PageItemBlurb}> 
                {!getSearch ? query["preview_caption"] : query["document"]["preview_caption"]}
              </div>
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
