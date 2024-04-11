import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { getAccountInfo } from './utilities/account.js'
import { checkToken } from './utilities/token.js';

import s from './css/FYP.module.css';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';

// temporary placeholder images before actual images are implemented from pages
import hands from './images/Logo_Hands_Crop.png'
import globe from './images/Logo_Earth.png';


function DonorAccount() {
  const navigate = useNavigate();

  useEffect(()=> {
    (async ()=> {
      if(!checkToken()) {
        navigate("/login");
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

  const openPage = async ()=> {
    // open pageviewer with specific page data
    document.write("Open Page");
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
        <div className={s.PageItem} onClick={()=>openPage()}>
          <div className={s.PageItemImageDiv}>
            <img className={s.PageItemImage} src={globe}/>
          </div>
          <div className={s.PageItemTextDiv}>
            <div className={s.PageItemTitle}>
              Jude Children's Research Hospital
            </div>
            <div className={s.PageItemBlurb}>
              We are committed to ensuring that every child with cancer and other catastrophic diseases will have access to quality care and treatment no matter where in the world they live.
            </div>
          </div>
        </div>
        <div className={s.PageItem} onClick={()=>openPage()}>
          <div className={s.PageItemImageDiv}>
            <img className={s.PageItemImage} src={hands}/>
          </div>
          <div className={s.PageItemTextDiv}>
            <div className={s.PageItemTitle}>
              American Red Cross
            </div>
            <div className={s.PageItemBlurb}>
              Each day, thousands of people – people just like you – provide compassionate care to those in need. Our network of generous donors, volunteers and employees share a mission of preventing and relieving suffering, here at home and around the world.
            </div>
          </div>
        </div>
        <div className={s.PageItem} onClick={()=>openPage()}>
          <div className={s.PageItemImageDiv}>
            <img className={s.PageItemImage} src={globe}/>
          </div>
          <div className={s.PageItemTextDiv}>
            <div className={s.PageItemTitle}>
              Another Charity
            </div>
            <div className={s.PageItemBlurb}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget pulvinar nisl, nec suscipit est. Vestibulum id interdum ligula. Sed finibus quis mauris eget volutpat. Etiam malesuada metus quis placerat eleifend.
            </div>
          </div>
        </div>
        <div className={s.PageItem} onClick={()=>openPage()}>
          <div className={s.PageItemImageDiv}>
            <img className={s.PageItemImage} src={hands}/>
          </div>
          <div className={s.PageItemTextDiv}>
            <div className={s.PageItemTitle}>
              Another Sample Charity
            </div>
            <div className={s.PageItemBlurb}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget pulvinar nisl, nec suscipit est. Vestibulum id interdum ligula. Sed finibus quis mauris eget volutpat. Etiam malesuada metus quis placerat eleifend.
            </div>
          </div>
        </div>
        <div className={s.PageItem} onClick={()=>openPage()}>
          <div className={s.PageItemImageDiv}>
            <img className={s.PageItemImage} src={globe}/>
          </div>
          <div className={s.PageItemTextDiv}>
            <div className={s.PageItemTitle}>
              50 character total character limit on title text
            </div>
            <div className={s.PageItemBlurb}>
              200 total character limit on preview 200 total character limit on preview 200 total character limit on preview 200 total character limit on preview 200 total character limit on preview200 total character limit on preview 200 total character limit on preview 200 total character limit on preview 200 total character limit on preview
            </div>
          </div>
        </div>
        <div className={s.PageItem} onClick={()=>openPage()}>
          <div className={s.PageItemImageDiv}>
            <img className={s.PageItemImage} src={hands}/>
          </div>
          <div className={s.PageItemTextDiv}>
            <div className={s.PageItemTitle}>
              50 character total character limit on title text
            </div>
            <div className={s.PageItemBlurb}>
              200 total character limit on preview
            </div>
          </div>
        </div>
        <div className={s.ButtonDiv}>
          <button className={s.button} onClick={() => loadMorePages()}>LOAD MORE</button>
        </div>
      </body>
    </div>
  );
}

export default DonorAccount;
