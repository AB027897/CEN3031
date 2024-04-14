import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/Donate.module.css';
import {getAccount, getAccountInfo} from './utilities/account';
import ajax from './utilities/ajax.js';
import {checkToken} from './utilities/token.js';
import loading from './images/loading.webp'

function Donate() {
  // header
  const [getName, setName] = useState("");
  // input variables
  const [getDollarAmt, setDollarAmt] = useState("");
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
      const user = await getAccount();
      const userInfo = await getAccountInfo(user);
      setName(userInfo["name"]);
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
          <div style={{alignItems: 'center', flex: 6}}>
            <p className={s.Title}>{getName}</p>
          </div>
          <div style={{flex: 1}}/>
        </header>
        <body className={s.App_body}>
          <div className={s.ContributionAmtDiv}>
            <div className={s.ItemTitle}>
                <h2>Contribution Amount</h2>
                <div className={s.ContributionHorDiv}>
                  <h2 className={s.DollarSignSpacing}>$</h2>
                  <input className={s.TextFieldDollars} type="text" placeholder="0.00" value={getDollarAmt} onChange={(event) => setDollarAmt(event.target.value)}/>
                </div>
            </div>
          </div>
          <div className={s.ItemTitle}>
              <h2>Name on Card</h2>
              <input className={s.TextField} type="text" placeholder="Enter Name..." value={getCardName} onChange={(event) => setCardName(event.target.value)}/>
          </div>
          <div className={s.ItemTitle}>
              <h2>Card Number</h2>
              <input className={s.TextField} type="text" placeholder="Enter Card Number..." maxLength={16} value={getCardNum} onChange={(event) => setCardNum(event.target.value)}/>
          </div>
          <div className={s.SmallInputTotalDiv}>
            <div className={s.SmallInputsTextDiv}>
              <h2 className={s.RightMargin}>Expiration Date</h2>
              <h2>CVC</h2>
            </div>
            <div className={s.SmallInputsDiv}>
              <input className={s.TextFieldDate} type="text" placeholder="mo" maxLength={2} value={getExpMonth} onChange={(event) => setExpMonth(event.target.value)}/>
              <h2>/</h2>
              <input className={s.TextFieldDate} type="text" placeholder="yr" maxLength={2} value={getExpYear} onChange={(event) => setExpYear(event.target.value)}/>
              <input className={s.TextFieldCVC} type="password" placeholder="###" maxLength={3} value={getCVC} onChange={(event) => setCVC(event.target.value)}/>
            </div>
          </div>
          <div className={s.ItemTitle}>
                <h2>Billing Address</h2>
                <input className={s.TextField} type="text" placeholder="Address Line 1..." value={getBillingAddress1} onChange={(event) => setBillingAddress1(event.target.value)}/>
                <input className={s.TextField} type="text" placeholder="Address Line 2..." value={getBillingAddress2} onChange={(event) => setBillingAddress2(event.target.value)}/>
                <input className={s.TextField} type="text" placeholder="Address Line 3..." value={getBillingAddress3} onChange={(event) => setBillingAddress3(event.target.value)}/>
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
