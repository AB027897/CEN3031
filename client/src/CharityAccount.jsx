import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/CharityAccount.module.css';
import phoneNumberFormat from './utilities/phoneNumberFormat.js';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';
import {getAccount, getAccountInfo} from './utilities/account';
import ajax from './utilities/ajax.js';
import loading from './images/loading.webp'

function CharityAccount() {
  const toSearchPage = ()=> { navigate("/search"); }
  const toFYP = ()=> { navigate("/fyp"); }

  const [getErrorText, setErrorText] = useState("");
  const [getPhoneNumber, setPhoneNumber] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getName, setName] = useState("");
  const [getType, setType] = useState("Select option...");

  // banking information variables
  const [getAccountNum, setAccountNum] = useState("");
  const [getRoutingNum, setRoutingNum] = useState("");
  const [getCountryCode, setCountryCode] = useState("");

  const [getLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=> {
    (async ()=> {
      const accountInfo = await getAccountInfo();
      setPhoneNumber(phoneNumberFormat(accountInfo["phone number"]));
      setEmail(accountInfo["email"]);
      setName(accountInfo["name"]);
      if(accountInfo["type"] !== "") {
        setType(accountInfo["type"]);
      }
      setLoading(false);
    })();
  }, [])

  const formatPhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumberFormat(phoneNumber));
  }; 
  const update = async()=> {
    const phoneNumber = getPhoneNumber.replace(/[-() ]/g, "");
    let account = await getAccount();
    account.account_type = "charity";
    account.email = getEmail;
    account.name = getName;
    account.charity_type = getType;
    account.phone = phoneNumber;
    const message = await ajax(account, "/addaccountinfo");
    if(message !== "") {
      setErrorText(message);
    }
  }
  return (
    <div>
      {getLoading ? 
      <div className={s.Loading}> 
        <img src={loading} className={s.Loading_img} ></img> 
      </div> :
      <div className={s.App}>
        <header className={s.App_header}>
        <hr className={s.Bar}/>
        <div className={s.HeaderImageContainer}>
          <div className={s.HeaderImageBG} onClick={()=> toSearchPage()}>
            <img src={search} alt="prop" className={s.HeaderImage}/>
          </div>
        </div>
        <hr className={s.Bar}/>
        <div className={s.HeaderImageContainer}>
          <div className={s.HeaderImageBG} onClick={()=> toFYP()}>
              <img src={home} alt="prop" className={s.HeaderImage}/>
          </div>
        </div>
        <hr className={s.Bar}/>
        <div className={s.MainImageBG}>
          <img src={settings} alt="prop" className={s.MainImage}/>
        </div>
        <hr className={s.Bar}/>
        </header>
        <body className={s.App_body}>
          <div className={s.ItemTitle}>
              <h2>Email</h2>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getEmail} onChange={(event) => setEmail(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Organization Name</h2>
              <input className={s.TextField} type="text" placeholder="Enter Text..." maxLength={50} value={getName} onChange={(event) => setName(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Phone Number </h2>
              <input className={s.TextField} type="text" placeholder="(XXX) XXX-XXXX" maxLength={14} value={getPhoneNumber} onChange={(event) => formatPhoneNumber(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Charity Type</h2>
              <select className={s.TextField} value={getType} onChange={(event) => setType(event.target.value)}>
                  <option className={s.TextField}>Select option...</option>
                  <option className={s.TextField}>Humanitarian Aid</option>
                  <option className={s.TextField}>Medical</option>
                  <option className={s.TextField}>Environmental</option>
                  <option className={s.TextField}>Education</option>
                  <option className={s.TextField}>Social Justice</option>
                  <option className={s.TextField}>Other</option>
              </select>
          </div>
          <hr className={s.BarSep}/>
          <div className={s.ItemTitle}>
              <h2>Banking Information</h2>
              <hr className={s.BankSeparator}/>
              <h3 className={s.Subheading}>Account Number</h3>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getAccountNum} onChange={(event) => setAccountNum(event.target.value)}/>
              <h3 className={s.Subheading}>Routing Number</h3>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getRoutingNum} onChange={(event) => setRoutingNum(event.target.value)}/>
              <h3 className={s.Subheading}>Country Code</h3>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getCountryCode} onChange={(event) => setCountryCode(event.target.value)}/>
          </div>
          <p className={s.ErrorText}>{getErrorText}</p>
          <div className={s.ButtonDiv}>
            <button className={s.button} onClick={() => update()}>UPDATE</button>
          </div>
          <div className={s.Customize}>
              <h2 className={s.CustomizeText}>Customize Charity Page</h2>
          </div>
          <div>
              <button className={s.SmallButton} onClick={() => navigate("/pageviewer")}>Preview</button>
              <button className={s.SmallButton} onClick={() => navigate("/pagecreator")}>Edit</button>
          </div>
        </body>
      </div>}
    </div>
  );
}

export default CharityAccount;
