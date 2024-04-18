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
import {checkToken} from './utilities/token.js';
import loading from './images/loading.webp'

function CharityAccount() {
  const toSearchPage = ()=> { 
    if(getConfigured) { // redundant now
      navigate("/search"); 
    }
  }
  const toFYP = ()=> { // redundant now
    if(getConfigured) {
      navigate("/fyp"); 
    }
  }
  const toPageCreator = ()=> { 
    if(getConfigured) {
      navigate("/pagecreator"); 
    }
    else {
      setErrorText("Must configure account before accessing page creator");
    }
  }
  const toPageViewer = ()=> { 
    if(getConfigured) {
      navigate("/pageviewer"); 
    }
    else {
      setErrorText("Must configure account before accessing page viewer"); 
    }
  }

  const [getErrorText, setErrorText] = useState("");
  const [getPhoneNumber, setPhoneNumber] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getName, setName] = useState("");
  const [getType, setType] = useState("Select option...");

  // banking information variables
  const [getAccountNum, setAccountNum] = useState("");
  const [getRoutingNum, setRoutingNum] = useState("");
  const [getCountry, setCountry] = useState("US");

  const [getLoading, setLoading] = useState(true);

  // firstTimeConfigure
  const [getConfigured, setConfigured] = useState(false);

  const navigate = useNavigate();
  useEffect(()=> {
    (async ()=> {
      if(!checkToken()) {
        navigate("/login");
      }
      const accountInfo = await getAccountInfo();
      setPhoneNumber(phoneNumberFormat(accountInfo["phone number"]));
      setEmail(accountInfo["email"]);
      setName(accountInfo["name"]);

      // I think these should be set below but I get an error when doing the country one so I'll keep it commented for now
      // setAccountNum(accountInfo["account_number"]);
      // setRoutingNum(accountInfo["routing_number"]);
      // setCountry(accountInfo["country"]);

      if(accountInfo["type"] !== "") {
        setType(accountInfo["type"]);
      }

      // set first time configure state
      if(localStorage.getItem('newUser')) {
        setConfigured(false);
      }
      else setConfigured(true);

      // exit loading state
      setLoading(false);
    })();
  }, [])

  const formatPhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumberFormat(phoneNumber));
  }; 
  const update = async()=> {
    
    let account = await getAccount();
    account.account_type = "charity";

    account.email = getEmail;

    // charity name error checking
    if(getName == "") {
      setErrorText("Valid organization name is required");
      return;
    }
    account.name = getName;

    // phone number error checking
    const phoneNumber = getPhoneNumber.replace(/[-() ]/g, "");
    if(phoneNumber.length != 10) {
      setErrorText("Phone number must be valid")
      return;
    }
    account.phone = phoneNumber;

    // charity type error checking
    if(getType == "Select option...") {
      setErrorText("Charity type must be selected")
      return;
    }
    account.charity_type = getType;
    
    // banking information error checking
    if(getConfigured) { // already configured. updating baking information
      if(getAccountNum.length == 0 && getRoutingNum.length != 0) {
        setErrorText("Account number is required when routing number is updated");
        return;
      }
      if(getAccountNum.length != 0 && getRoutingNum.length != 9) {
        setErrorText("Valid routing number (9 digits) is required when account number is updated");
        return;
      }
    }
    else { // first time configuration: account number and routing number required
      if(getAccountNum.length == 0) {
        setErrorText("Account number is required");
        return;
      }
      if(getRoutingNum.length == 0) {
        setErrorText("Routing number is required");
        return;
      }
      if(getRoutingNum.length !== 9) {
        setErrorText("Routing number must be 9 digits");
        return;
      }
    }  
    account.routing_number = getRoutingNum;
    account.account_number = getAccountNum;

    // Country - no error checking needed (US by default)
    account.country = getCountry;

    // check for error or all valid
    const message = await ajax(account, "/addaccountinfo");
    if(message !== "") { // handles errors such as from donation API or invalid email
      if(message.includes("Invalid email address") || message.includes("INVALID_EMAIL")) {
        setErrorText("Email address must be valid");
        return;
      }
      else { // catch all for other errors (should only be banking)
        setErrorText("Invalid banking information")
        return;
      }
    }

    // no error if it reached this state
    setErrorText("");
    localStorage.removeItem("newUser");
    setConfigured(true);
  }
  const logout = async ()=> {
    // route to home
    localStorage.clear();
    navigate("/");
  }
  return (
    <div>
      {getLoading ? 
      <div className={s.Loading}> 
        <img src={loading} className={s.Loading_img} ></img> 
      </div> :
      <div className={s.App}>
        <header className={s.App_header}>
        {getConfigured ?
        <>
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
        </> :
        <div className={s.HeaderText}>Account Configuration</div>
        }
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
                  <option className={s.TextField} selected hidden>Select Charity Type...</option>
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
              <input className={s.TextField} type="password" placeholder="Enter Text..." value={getAccountNum} onChange={(event) => setAccountNum(event.target.value)}/>
              <h3 className={s.Subheading}>Routing Number</h3>
              <input className={s.TextField} type="text" placeholder="Enter Text..." value={getRoutingNum} onChange={(event) => setRoutingNum(event.target.value)}/>
              <h3 className={s.Subheading}>Country</h3> 
              <select className={s.TextField} type="text" id="country" value={getCountry} onChange={(event) => setCountry(event.target.value)}>
                <option value="US" selected>United States</option> 
                <option value="AF">Afghanistan</option> 
                <option value="AX">Aland Islands</option> 
                <option value="AL">Albania</option> 
                <option value="DZ">Algeria</option> 
                <option value="AS">American Samoa</option> 
                <option value="AD">Andorra</option> 
                <option value="AO">Angola</option> 
                <option value="AI">Anguilla</option> 
                <option value="AQ">Antarctica</option> 
                <option value="AG">Antigua and Barbuda</option> 
                <option value="AR">Argentina</option> 
                <option value="AM">Armenia</option> 
                <option value="AW">Aruba</option> 
                <option value="AU">Australia</option> 
                <option value="AT">Austria</option> 
                <option value="AZ">Azerbaijan</option> 
                <option value="BS">Bahamas</option> 
                <option value="BH">Bahrain</option> 
                <option value="BD">Bangladesh</option> 
                <option value="BB">Barbados</option> 
                <option value="BY">Belarus</option> 
                <option value="BE">Belgium</option> 
                <option value="BZ">Belize</option> 
                <option value="BJ">Benin</option> 
                <option value="BM">Bermuda</option> 
                <option value="BT">Bhutan</option> 
                <option value="BO">Bolivia</option> 
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option> 
                <option value="BA">Bosnia and Herzegovina</option> 
                <option value="BW">Botswana</option> 
                <option value="BV">Bouvet Island</option> 
                <option value="BR">Brazil</option> 
                <option value="IO">British Indian Ocean Territory</option> 
                <option value="BN">Brunei Darussalam</option> 
                <option value="BG">Bulgaria</option> 
                <option value="BF">Burkina Faso</option> 
                <option value="BI">Burundi</option> 
                <option value="KH">Cambodia</option> 
                <option value="CM">Cameroon</option> 
                <option value="CA">Canada</option> 
                <option value="CV">Cape Verde</option> 
                <option value="KY">Cayman Islands</option> 
                <option value="CF">Central African Republic</option> 
                <option value="TD">Chad</option> 
                <option value="CL">Chile</option> 
                <option value="CN">China</option> 
                <option value="CX">Christmas Island</option> 
                <option value="CC">Cocos (Keeling) Islands</option> 
                <option value="CO">Colombia</option> 
                <option value="KM">Comoros</option> 
                <option value="CG">Congo</option> 
                <option value="CD">Congo, Democratic Republic of the Congo</option> 
                <option value="CK">Cook Islands</option> 
                <option value="CR">Costa Rica</option> 
                <option value="CI">Cote D'Ivoire</option> 
                <option value="HR">Croatia</option> 
                <option value="CU">Cuba</option> 
                <option value="CW">Curacao</option> 
                <option value="CY">Cyprus</option> 
                <option value="CZ">Czech Republic</option> 
                <option value="DK">Denmark</option> 
                <option value="DJ">Djibouti</option> 
                <option value="DM">Dominica</option> 
                <option value="DO">Dominican Republic</option> 
                <option value="EC">Ecuador</option> 
                <option value="EG">Egypt</option> 
                <option value="SV">El Salvador</option> 
                <option value="GQ">Equatorial Guinea</option> 
                <option value="ER">Eritrea</option> 
                <option value="EE">Estonia</option> 
                <option value="ET">Ethiopia</option> 
                <option value="FK">Falkland Islands (Malvinas)</option> 
                <option value="FO">Faroe Islands</option> 
                <option value="FJ">Fiji</option> 
                <option value="FI">Finland</option> 
                <option value="FR">France</option> 
                <option value="GF">French Guiana</option> 
                <option value="PF">French Polynesia</option> 
                <option value="TF">French Southern Territories</option> 
                <option value="GA">Gabon</option> 
                <option value="GM">Gambia</option> 
                <option value="GE">Georgia</option> 
                <option value="DE">Germany</option> 
                <option value="GH">Ghana</option> 
                <option value="GI">Gibraltar</option> 
                <option value="GR">Greece</option> 
                <option value="GL">Greenland</option> 
                <option value="GD">Grenada</option> 
                <option value="GP">Guadeloupe</option> 
                <option value="GU">Guam</option> 
                <option value="GT">Guatemala</option> 
                <option value="GG">Guernsey</option> 
                <option value="GN">Guinea</option> 
                <option value="GW">Guinea-Bissau</option> 
                <option value="GY">Guyana</option> 
                <option value="HT">Haiti</option> 
                <option value="HM">Heard Island and Mcdonald Islands</option> 
                <option value="VA">Holy See (Vatican City State)</option> 
                <option value="HN">Honduras</option> 
                <option value="HK">Hong Kong</option> 
                <option value="HU">Hungary</option> 
                <option value="IS">Iceland</option> 
                <option value="IN">India</option> 
                <option value="ID">Indonesia</option> 
                <option value="IR">Iran, Islamic Republic of</option> 
                <option value="IQ">Iraq</option> 
                <option value="IE">Ireland</option> 
                <option value="IM">Isle of Man</option> 
                <option value="IL">Israel</option> 
                <option value="IT">Italy</option> 
                <option value="JM">Jamaica</option> 
                <option value="JP">Japan</option> 
                <option value="JE">Jersey</option> 
                <option value="JO">Jordan</option> 
                <option value="KZ">Kazakhstan</option> 
                <option value="KE">Kenya</option> 
                <option value="KI">Kiribati</option> 
                <option value="KP">Korea, Democratic People's Republic of</option> 
                <option value="KR">Korea, Republic of</option> 
                <option value="XK">Kosovo</option> 
                <option value="KW">Kuwait</option> 
                <option value="KG">Kyrgyzstan</option> 
                <option value="LA">Lao People's Democratic Republic</option> 
                <option value="LV">Latvia</option> 
                <option value="LB">Lebanon</option> 
                <option value="LS">Lesotho</option> 
                <option value="LR">Liberia</option> 
                <option value="LY">Libyan Arab Jamahiriya</option> 
                <option value="LI">Liechtenstein</option> 
                <option value="LT">Lithuania</option> 
                <option value="LU">Luxembourg</option> 
                <option value="MO">Macao</option> 
                <option value="MK">Macedonia, the Former Yugoslav Republic of</option> 
                <option value="MG">Madagascar</option> 
                <option value="MW">Malawi</option> 
                <option value="MY">Malaysia</option> 
                <option value="MV">Maldives</option> 
                <option value="ML">Mali</option> 
                <option value="MT">Malta</option> 
                <option value="MH">Marshall Islands</option> 
                <option value="MQ">Martinique</option> 
                <option value="MR">Mauritania</option> 
                <option value="MU">Mauritius</option> 
                <option value="YT">Mayotte</option> 
                <option value="MX">Mexico</option> 
                <option value="FM">Micronesia, Federated States of</option> 
                <option value="MD">Moldova, Republic of</option> 
                <option value="MC">Monaco</option> 
                <option value="MN">Mongolia</option> 
                <option value="ME">Montenegro</option> 
                <option value="MS">Montserrat</option> 
                <option value="MA">Morocco</option> 
                <option value="MZ">Mozambique</option> 
                <option value="MM">Myanmar</option> 
                <option value="NA">Namibia</option> 
                <option value="NR">Nauru</option> 
                <option value="NP">Nepal</option> 
                <option value="NL">Netherlands</option> 
                <option value="AN">Netherlands Antilles</option> 
                <option value="NC">New Caledonia</option> 
                <option value="NZ">New Zealand</option> 
                <option value="NI">Nicaragua</option> 
                <option value="NE">Niger</option> 
                <option value="NG">Nigeria</option> 
                <option value="NU">Niue</option> 
                <option value="NF">Norfolk Island</option> 
                <option value="MP">Northern Mariana Islands</option> 
                <option value="NO">Norway</option> 
                <option value="OM">Oman</option> 
                <option value="PK">Pakistan</option> 
                <option value="PW">Palau</option> 
                <option value="PS">Palestinian Territory, Occupied</option> 
                <option value="PA">Panama</option> 
                <option value="PG">Papua New Guinea</option> 
                <option value="PY">Paraguay</option> 
                <option value="PE">Peru</option> 
                <option value="PH">Philippines</option> 
                <option value="PN">Pitcairn</option> 
                <option value="PL">Poland</option> 
                <option value="PT">Portugal</option> 
                <option value="PR">Puerto Rico</option> 
                <option value="QA">Qatar</option> 
                <option value="RE">Reunion</option> 
                <option value="RO">Romania</option> 
                <option value="RU">Russian Federation</option> 
                <option value="RW">Rwanda</option> 
                <option value="BL">Saint Barthelemy</option> 
                <option value="SH">Saint Helena</option> 
                <option value="KN">Saint Kitts and Nevis</option> 
                <option value="LC">Saint Lucia</option> 
                <option value="MF">Saint Martin</option> 
                <option value="PM">Saint Pierre and Miquelon</option> 
                <option value="VC">Saint Vincent and the Grenadines</option> 
                <option value="WS">Samoa</option> 
                <option value="SM">San Marino</option> 
                <option value="ST">Sao Tome and Principe</option> 
                <option value="SA">Saudi Arabia</option> 
                <option value="SN">Senegal</option> 
                <option value="RS">Serbia</option> 
                <option value="CS">Serbia and Montenegro</option> 
                <option value="SC">Seychelles</option> 
                <option value="SL">Sierra Leone</option> 
                <option value="SG">Singapore</option> 
                <option value="SX">Sint Maarten</option> 
                <option value="SK">Slovakia</option> 
                <option value="SI">Slovenia</option> 
                <option value="SB">Solomon Islands</option> 
                <option value="SO">Somalia</option> 
                <option value="ZA">South Africa</option> 
                <option value="GS">South Georgia and the South Sandwich Islands</option> 
                <option value="SS">South Sudan</option> 
                <option value="ES">Spain</option> 
                <option value="LK">Sri Lanka</option> 
                <option value="SD">Sudan</option> 
                <option value="SR">Suriname</option> 
                <option value="SJ">Svalbard and Jan Mayen</option> 
                <option value="SZ">Swaziland</option> 
                <option value="SE">Sweden</option> 
                <option value="CH">Switzerland</option> 
                <option value="SY">Syrian Arab Republic</option> 
                <option value="TW">Taiwan, Province of China</option> 
                <option value="TJ">Tajikistan</option> 
                <option value="TZ">Tanzania, United Republic of</option> 
                <option value="TH">Thailand</option> 
                <option value="TL">Timor-Leste</option> 
                <option value="TG">Togo</option> 
                <option value="TK">Tokelau</option> 
                <option value="TO">Tonga</option> 
                <option value="TT">Trinidad and Tobago</option> 
                <option value="TN">Tunisia</option> 
                <option value="TR">Turkey</option> 
                <option value="TM">Turkmenistan</option> 
                <option value="TC">Turks and Caicos Islands</option> 
                <option value="TV">Tuvalu</option> 
                <option value="UG">Uganda</option> 
                <option value="UA">Ukraine</option> 
                <option value="AE">United Arab Emirates</option> 
                <option value="GB">United Kingdom</option> 
                <option value="UM">United States Minor Outlying Islands</option> 
                <option value="UY">Uruguay</option> 
                <option value="UZ">Uzbekistan</option> 
                <option value="VU">Vanuatu</option> 
                <option value="VE">Venezuela</option> 
                <option value="VN">Viet Nam</option> 
                <option value="VG">Virgin Islands, British</option> 
                <option value="VI">Virgin Islands, U.s.</option> 
                <option value="WF">Wallis and Futuna</option> 
                <option value="EH">Western Sahara</option> 
                <option value="YE">Yemen</option> 
                <option value="ZM">Zambia</option> 
                <option value="ZW">Zimbabwe</option>
              </select>
          </div>
          <p className={s.ErrorText}>{getErrorText}</p>
          <div className={s.ButtonDiv}>
            <button className={s.button} onClick={() => update()}>{getConfigured ? <>UPDATE</> : <>SUBMIT</>}</button>
          </div>
          <div className={s.Customize}>
              <h2 className={s.CustomizeText}>Customize Charity Page</h2>
          </div>
          <div>
              <button className={s.SmallButton} onClick={() => toPageViewer()}>Preview</button>
              <button className={s.SmallButton} onClick={() => toPageCreator()}>Edit</button>
          </div>
          <hr className={s.BarSep}/>
          <button className={s.button2} onClick={() => logout()}>Log Out</button>
        </body>
      </div>}
    </div>
  );
}

export default CharityAccount;
