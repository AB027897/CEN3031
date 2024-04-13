import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/CharityAccount.module.css';
import {getAccount, getAccountInfo} from './utilities/account';
import ajax from './utilities/ajax.js';
import {checkToken} from './utilities/token.js';
import loading from './images/loading.webp'

function Donate() {
  // header
  const [getName, setName] = useState("");
  // input variables
  const [getCardName, setCardName] = useState("");
  const [getCardNum, setCardNum] = useState("");
  const [getCVC, setCVC] = useState("");
  const [getExpMonth, setExpMonth] = useState("");
  const [getExpYear, setExpYear] = useState("");
  const [getBillingAddress1, setBillingAddress1] = useState("");
  const [getBillingAddress2, setBillingAddress2] = useState("");
  const [getBillingAddress3, setBillingAddress3] = useState("");
  // error
  const [getErrorText, setErrorText] = useState("");
  // loading
  const [getLoading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(()=> {
    (async ()=> {
      if(!checkToken()) {
        navigate("/login");
      }
      // const user = await getAccount();
      // const userInfo = await getAccountInfo(user);
      // setName(userInfo["name"]);
      setLoading(false);
    })();
  }, [])
  const donate = async()=> {

  }
  return (
    <div>
      {getLoading ? 
      <div className={s.Loading}> 
        <img src={loading} className={s.Loading_img} ></img> 
      </div> :
      <div className={s.App}>
        <header className={s.App_header}>
          <div style={{flex:1}}>
            <a className={s.BackButton} href="javascript:history.back()" rel="noopener noreferrer">&lt; Go Back</a>
          </div>
          <div style={{alignItems: 'cemter', flex: 6}}>
            <p className={s.Title}>{getName}</p>
          </div>
          <div style={{flex: 1}}/>
        </header>
        <body className={s.App_body}>
        <div className={s.ItemTitle}>
              <h2>Name on Card</h2>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getCardNum} onChange={(event) => setCardNum(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Card Number</h2>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getCardNum} onChange={(event) => setCardNum(event.target.value)}/>
          </div>
          <div className={s.SmallInputsDiv}>

          </div>
          <div className={s.ItemTitle}>
              <h2>CVC</h2>
              <input className={s.TextField} type="password" placeholder="Enter Text..." maxLength={50} value={getCVC} onChange={(event) => setCVC(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Expiration Date</h2>
              <input className={s.TextField} type="text" placeholder="Enter Text..." maxLength={14} value={getExpMonth} onChange={(event) => setExpMonth(event.target.value)}/>
              <input className={s.TextField} type="text" placeholder="Enter Text..." maxLength={14} value={getExpYear} onChange={(event) => setExpYear(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Billing Address</h2>
              <input className={s.TextField} type="text" placeholder="Line 1..." maxLength={50} value={getName} onChange={(event) => setName(event.target.value)}/>
              <input className={s.TextField} type="text" placeholder="Line 2..." maxLength={50} value={getName} onChange={(event) => setName(event.target.value)}/>
              <input className={s.TextField} type="text" placeholder="Line 3..." maxLength={50} value={getName} onChange={(event) => setName(event.target.value)}/>
          </div>          
          <hr className={s.BarSep}/>
          <p className={s.ErrorText}>{getErrorText}</p>
          <div className={s.ButtonDiv}>
            <button className={s.button} onClick={() => donate()}>CONFIRM</button>
          </div>
        </body>
      </div>}
    </div>
  );
}

export default Donate;
