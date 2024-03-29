import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/CharityAccount.module.css';
import phoneNumberFormat from './utilities/phoneNumberFormat.js';
import home from './images/HomeIcon.png';
import search from './images/SearchIcon.png';
import settings from './images/SettingsIcon.png';
import { getUser, getToken } from './utilities/token';
import Account from './utilities/account';
import ajax from './utilities/ajax.js'

function CharityAccount() {
  const [getErrorText, setErrorText] = useState("");
  const [getPhoneNumber, setPhoneNumber] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getName, setName] = useState("");
  const [getType, setType] = useState("Select option...");
  const navigate = useNavigate();
  const getAccount = async () => {
    const user = await getUser();
    return new Promise((resolve, reject)=> {
      resolve(new Account(user['localId'], getToken()));
    });
  }
  const getAccountInfo = async () => {
    const account = await getAccount();
    return new Promise( (resolve, reject)=> {
      resolve(ajax(account, "/getaccountinfo", true));
    });
  }
  useEffect(()=> {
    (async ()=> {
      const accountInfo = await getAccountInfo();
      setPhoneNumber(phoneNumberFormat(accountInfo["phone number"]));
      setEmail(accountInfo["email"]);
      setName(accountInfo["name"]);
      if(accountInfo["charity_type"] !== "") {
        setType(accountInfo["charity_type"]);
      }
    })();
  }, [])

  const formatPhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumberFormat(phoneNumber));
  }; 
  const update = async()=> {
    const phoneNumber = getPhoneNumber.replace(/[-\(\)]/g, "");
    let account = await getAccount();
    account.account_type = "charity";
    account.email = getEmail;
    account.name = getName;
    account.charity_type = getType;
    account.phone = phoneNumber;
    await ajax(account, "/addaccountinfo", false);
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
            <h2 className={s.ItemTitleText}>Email</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..." value={getEmail} onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className={s.ItemTitle}>
            <h2 className={s.ItemTitleText}>Organization Name</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..." value={getName} onChange={(event) => setName(event.target.value)}/>
        </div>
        <div className={s.ItemTitle}>
            <h2 className={s.ItemTitleText}>Phone Number </h2>
            <input className={s.TextField} type="text" placeholder="000-000-0000" maxLength={14} value={getPhoneNumber} onChange={(event) => formatPhoneNumber(event.target.value)}/>
        </div>
        <div className={s.ItemTitle}>
            <h2 className={s.ItemTitleText}>Charity Type</h2>
            <select className={s.Dropdown} value={getType} onChange={(event) => setType(event.target.value)}>
                <option className={s.TextField}>Select option...</option>
                <option className={s.TextField}> Humanitarian Aid</option>
                <option className={s.TextField}>Medical</option>
                <option className={s.TextField}>Environmental</option>
                <option className={s.TextField}>Education</option>
                <option className={s.TextField}>Social Justice</option>
                <option className={s.TextField}>Other</option>
            </select>
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
    </div>
  );
}

export default CharityAccount;
