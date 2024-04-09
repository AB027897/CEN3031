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
  const [getCountry, setCountry] = useState("United States");

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
    account.account_number = getAccountNum;
    account.routing_number = getRoutingNum;
    account.country = getCountry;
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
                <option className={s.TextField} value="United States" selected>United States</option>
                <option className={s.TextField} value="Afghanistan">Afghanistan</option>
                <option className={s.TextField} value="Åland Islands">Åland Islands</option>
                <option className={s.TextField} value="Albania">Albania</option>
                <option className={s.TextField} value="Algeria">Algeria</option>
                <option className={s.TextField} value="American Samoa">American Samoa</option>
                <option className={s.TextField} value="Andorra">Andorra</option>
                <option className={s.TextField} value="Angola">Angola</option>
                <option className={s.TextField} value="Anguilla">Anguilla</option>
                <option className={s.TextField} value="Antarctica">Antarctica</option>
                <option className={s.TextField} value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option className={s.TextField} value="Argentina">Argentina</option>
                <option className={s.TextField} value="Armenia">Armenia</option>
                <option className={s.TextField} value="Aruba">Aruba</option>
                <option className={s.TextField} value="Australia">Australia</option>
                <option className={s.TextField} value="Austria">Austria</option>
                <option className={s.TextField} value="Azerbaijan">Azerbaijan</option>
                <option className={s.TextField} value="Bahamas">Bahamas</option>
                <option className={s.TextField} value="Bahrain">Bahrain</option>
                <option className={s.TextField} value="Bangladesh">Bangladesh</option>
                <option className={s.TextField} value="Barbados">Barbados</option>
                <option className={s.TextField} value="Belarus">Belarus</option>
                <option className={s.TextField} value="Belgium">Belgium</option>
                <option className={s.TextField} value="Belize">Belize</option>
                <option className={s.TextField} value="Benin">Benin</option>
                <option className={s.TextField} value="Bermuda">Bermuda</option>
                <option className={s.TextField} value="Bhutan">Bhutan</option>
                <option className={s.TextField} value="Bolivia">Bolivia</option>
                <option className={s.TextField} value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option className={s.TextField} value="Botswana">Botswana</option>
                <option className={s.TextField} value="Bouvet Island">Bouvet Island</option>
                <option className={s.TextField} value="Brazil">Brazil</option>
                <option className={s.TextField} value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option className={s.TextField} value="Brunei Darussalam">Brunei Darussalam</option>
                <option className={s.TextField} value="Bulgaria">Bulgaria</option>
                <option className={s.TextField} value="Burkina Faso">Burkina Faso</option>
                <option className={s.TextField} value="Burundi">Burundi</option>
                <option className={s.TextField} value="Cambodia">Cambodia</option>
                <option className={s.TextField} value="Cameroon">Cameroon</option>
                <option className={s.TextField} value="Canada">Canada</option>
                <option className={s.TextField} value="Cape Verde">Cape Verde</option>
                <option className={s.TextField} value="Cayman Islands">Cayman Islands</option>
                <option className={s.TextField} value="Central African Republic">Central African Republic</option>
                <option className={s.TextField} value="Chad">Chad</option>
                <option className={s.TextField} value="Chile">Chile</option>
                <option className={s.TextField} value="China">China</option>
                <option className={s.TextField} value="Christmas Island">Christmas Island</option>
                <option className={s.TextField} value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option className={s.TextField} value="Colombia">Colombia</option>
                <option className={s.TextField} value="Comoros">Comoros</option>
                <option className={s.TextField} value="Congo">Congo</option>
                <option className={s.TextField} value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                <option className={s.TextField} value="Cook Islands">Cook Islands</option>
                <option className={s.TextField} value="Costa Rica">Costa Rica</option>
                <option className={s.TextField} value="Cote D'ivoire">Cote D'ivoire</option>
                <option className={s.TextField} value="Croatia">Croatia</option>
                <option className={s.TextField} value="Cuba">Cuba</option>
                <option className={s.TextField} value="Cyprus">Cyprus</option>
                <option className={s.TextField} value="Czech Republic">Czech Republic</option>
                <option className={s.TextField} value="Denmark">Denmark</option>
                <option className={s.TextField} value="Djibouti">Djibouti</option>
                <option className={s.TextField} value="Dominica">Dominica</option>
                <option className={s.TextField} value="Dominican Republic">Dominican Republic</option>
                <option className={s.TextField} value="Ecuador">Ecuador</option>
                <option className={s.TextField} value="Egypt">Egypt</option>
                <option className={s.TextField} value="El Salvador">El Salvador</option>
                <option className={s.TextField} value="Equatorial Guinea">Equatorial Guinea</option>
                <option className={s.TextField} value="Eritrea">Eritrea</option>
                <option className={s.TextField} value="Estonia">Estonia</option>
                <option className={s.TextField} value="Ethiopia">Ethiopia</option>
                <option className={s.TextField} value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option className={s.TextField} value="Faroe Islands">Faroe Islands</option>
                <option className={s.TextField} value="Fiji">Fiji</option>
                <option className={s.TextField} value="Finland">Finland</option>
                <option className={s.TextField} value="France">France</option>
                <option className={s.TextField} value="French Guiana">French Guiana</option>
                <option className={s.TextField} value="French Polynesia">French Polynesia</option>
                <option className={s.TextField} value="French Southern Territories">French Southern Territories</option>
                <option className={s.TextField} value="Gabon">Gabon</option>
                <option className={s.TextField} value="Gambia">Gambia</option>
                <option className={s.TextField} value="Georgia">Georgia</option>
                <option className={s.TextField} value="Germany">Germany</option>
                <option className={s.TextField} value="Ghana">Ghana</option>
                <option className={s.TextField} value="Gibraltar">Gibraltar</option>
                <option className={s.TextField} value="Greece">Greece</option>
                <option className={s.TextField} value="Greenland">Greenland</option>
                <option className={s.TextField} value="Grenada">Grenada</option>
                <option className={s.TextField} value="Guadeloupe">Guadeloupe</option>
                <option className={s.TextField} value="Guam">Guam</option>
                <option className={s.TextField} value="Guatemala">Guatemala</option>
                <option className={s.TextField} value="Guernsey">Guernsey</option>
                <option className={s.TextField} value="Guinea">Guinea</option>
                <option className={s.TextField} value="Guinea-bissau">Guinea-bissau</option>
                <option className={s.TextField} value="Guyana">Guyana</option>
                <option className={s.TextField} value="Haiti">Haiti</option>
                <option className={s.TextField} value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option className={s.TextField} value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option className={s.TextField} value="Honduras">Honduras</option>
                <option className={s.TextField} value="Hong Kong">Hong Kong</option>
                <option className={s.TextField} value="Hungary">Hungary</option>
                <option className={s.TextField} value="Iceland">Iceland</option>
                <option className={s.TextField} value="India">India</option>
                <option className={s.TextField} value="Indonesia">Indonesia</option>
                <option className={s.TextField} value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option className={s.TextField} value="Iraq">Iraq</option>
                <option className={s.TextField} value="Ireland">Ireland</option>
                <option className={s.TextField} value="Isle of Man">Isle of Man</option>
                <option className={s.TextField} value="Israel">Israel</option>
                <option className={s.TextField} value="Italy">Italy</option>
                <option className={s.TextField} value="Jamaica">Jamaica</option>
                <option className={s.TextField} value="Japan">Japan</option>
                <option className={s.TextField} value="Jersey">Jersey</option>
                <option className={s.TextField} value="Jordan">Jordan</option>
                <option className={s.TextField} value="Kazakhstan">Kazakhstan</option>
                <option className={s.TextField} value="Kenya">Kenya</option>
                <option className={s.TextField} value="Kiribati">Kiribati</option>
                <option className={s.TextField} value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option className={s.TextField} value="Korea, Republic of">Korea, Republic of</option>
                <option className={s.TextField} value="Kuwait">Kuwait</option>
                <option className={s.TextField} value="Kyrgyzstan">Kyrgyzstan</option>
                <option className={s.TextField} value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option className={s.TextField} value="Latvia">Latvia</option>
                <option className={s.TextField} value="Lebanon">Lebanon</option>
                <option className={s.TextField} value="Lesotho">Lesotho</option>
                <option className={s.TextField} value="Liberia">Liberia</option>
                <option className={s.TextField} value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option className={s.TextField} value="Liechtenstein">Liechtenstein</option>
                <option className={s.TextField} value="Lithuania">Lithuania</option>
                <option className={s.TextField} value="Luxembourg">Luxembourg</option>
                <option className={s.TextField} value="Macao">Macao</option>
                <option className={s.TextField} value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                <option className={s.TextField} value="Madagascar">Madagascar</option>
                <option className={s.TextField} value="Malawi">Malawi</option>
                <option className={s.TextField} value="Malaysia">Malaysia</option>
                <option className={s.TextField} value="Maldives">Maldives</option>
                <option className={s.TextField} value="Mali">Mali</option>
                <option className={s.TextField} value="Malta">Malta</option>
                <option className={s.TextField} value="Marshall Islands">Marshall Islands</option>
                <option className={s.TextField} value="Martinique">Martinique</option>
                <option className={s.TextField} value="Mauritania">Mauritania</option>
                <option className={s.TextField} value="Mauritius">Mauritius</option>
                <option className={s.TextField} value="Mayotte">Mayotte</option>
                <option className={s.TextField} value="Mexico">Mexico</option>
                <option className={s.TextField} value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option className={s.TextField} value="Moldova, Republic of">Moldova, Republic of</option>
                <option className={s.TextField} value="Monaco">Monaco</option>
                <option className={s.TextField} value="Mongolia">Mongolia</option>
                <option className={s.TextField} value="Montenegro">Montenegro</option>
                <option className={s.TextField} value="Montserrat">Montserrat</option>
                <option className={s.TextField} value="Morocco">Morocco</option>
                <option className={s.TextField} value="Mozambique">Mozambique</option>
                <option className={s.TextField} value="Myanmar">Myanmar</option>
                <option className={s.TextField} value="Namibia">Namibia</option>
                <option className={s.TextField} value="Nauru">Nauru</option>
                <option className={s.TextField} value="Nepal">Nepal</option>
                <option className={s.TextField} value="Netherlands">Netherlands</option>
                <option className={s.TextField} value="Netherlands Antilles">Netherlands Antilles</option>
                <option className={s.TextField} value="New Caledonia">New Caledonia</option>
                <option className={s.TextField} value="New Zealand">New Zealand</option>
                <option className={s.TextField} value="Nicaragua">Nicaragua</option>
                <option className={s.TextField} value="Niger">Niger</option>
                <option className={s.TextField} value="Nigeria">Nigeria</option>
                <option className={s.TextField} value="Niue">Niue</option>
                <option className={s.TextField} value="Norfolk Island">Norfolk Island</option>
                <option className={s.TextField} value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option className={s.TextField} value="Norway">Norway</option>
                <option className={s.TextField} value="Oman">Oman</option>
                <option className={s.TextField} value="Pakistan">Pakistan</option>
                <option className={s.TextField} value="Palau">Palau</option>
                <option className={s.TextField} value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option className={s.TextField} value="Panama">Panama</option>
                <option className={s.TextField} value="Papua New Guinea">Papua New Guinea</option>
                <option className={s.TextField} value="Paraguay">Paraguay</option>
                <option className={s.TextField} value="Peru">Peru</option>
                <option className={s.TextField} value="Philippines">Philippines</option>
                <option className={s.TextField} value="Pitcairn">Pitcairn</option>
                <option className={s.TextField} value="Poland">Poland</option>
                <option className={s.TextField} value="Portugal">Portugal</option>
                <option className={s.TextField} value="Puerto Rico">Puerto Rico</option>
                <option className={s.TextField} value="Qatar">Qatar</option>
                <option className={s.TextField} value="Reunion">Reunion</option>
                <option className={s.TextField} value="Romania">Romania</option>
                <option className={s.TextField} value="Russian Federation">Russian Federation</option>
                <option className={s.TextField} value="Rwanda">Rwanda</option>
                <option className={s.TextField} value="Saint Helena">Saint Helena</option>
                <option className={s.TextField} value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option className={s.TextField} value="Saint Lucia">Saint Lucia</option>
                <option className={s.TextField} value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option className={s.TextField} value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                <option className={s.TextField} value="Samoa">Samoa</option>
                <option className={s.TextField} value="San Marino">San Marino</option>
                <option className={s.TextField} value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option className={s.TextField} value="Saudi Arabia">Saudi Arabia</option>
                <option className={s.TextField} value="Senegal">Senegal</option>
                <option className={s.TextField} value="Serbia">Serbia</option>
                <option className={s.TextField} value="Seychelles">Seychelles</option>
                <option className={s.TextField} value="Sierra Leone">Sierra Leone</option>
                <option className={s.TextField} value="Singapore">Singapore</option>
                <option className={s.TextField} value="Slovakia">Slovakia</option>
                <option className={s.TextField} value="Slovenia">Slovenia</option>
                <option className={s.TextField} value="Solomon Islands">Solomon Islands</option>
                <option className={s.TextField} value="Somalia">Somalia</option>
                <option className={s.TextField} value="South Africa">South Africa</option>
                <option className={s.TextField} value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                <option className={s.TextField} value="Spain">Spain</option>
                <option className={s.TextField} value="Sri Lanka">Sri Lanka</option>
                <option className={s.TextField} value="Sudan">Sudan</option>
                <option className={s.TextField} value="Suriname">Suriname</option>
                <option className={s.TextField} value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option className={s.TextField} value="Swaziland">Swaziland</option>
                <option className={s.TextField} value="Sweden">Sweden</option>
                <option className={s.TextField} value="Switzerland">Switzerland</option>
                <option className={s.TextField} value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option className={s.TextField} value="Taiwan">Taiwan</option>
                <option className={s.TextField} value="Tajikistan">Tajikistan</option>
                <option className={s.TextField} value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option className={s.TextField} value="Thailand">Thailand</option>
                <option className={s.TextField} value="Timor-leste">Timor-leste</option>
                <option className={s.TextField} value="Togo">Togo</option>
                <option className={s.TextField} value="Tokelau">Tokelau</option>
                <option className={s.TextField} value="Tonga">Tonga</option>
                <option className={s.TextField} value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option className={s.TextField} value="Tunisia">Tunisia</option>
                <option className={s.TextField} value="Turkey">Turkey</option>
                <option className={s.TextField} value="Turkmenistan">Turkmenistan</option>
                <option className={s.TextField} value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option className={s.TextField} value="Tuvalu">Tuvalu</option>
                <option className={s.TextField} value="Uganda">Uganda</option>
                <option className={s.TextField} value="Ukraine">Ukraine</option>
                <option className={s.TextField} value="United Arab Emirates">United Arab Emirates</option>
                <option className={s.TextField} value="United Kingdom">United Kingdom</option>
                <option className={s.TextField} value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option className={s.TextField} value="Uruguay">Uruguay</option>
                <option className={s.TextField} value="Uzbekistan">Uzbekistan</option>
                <option className={s.TextField} value="Vanuatu">Vanuatu</option>
                <option className={s.TextField} value="Venezuela">Venezuela</option>
                <option className={s.TextField} value="Viet Nam">Viet Nam</option>
                <option className={s.TextField} value="Virgin Islands, British">Virgin Islands, British</option>
                <option className={s.TextField} value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                <option className={s.TextField} value="Wallis and Futuna">Wallis and Futuna</option>
                <option className={s.TextField} value="Western Sahara">Western Sahara</option>
                <option className={s.TextField} value="Yemen">Yemen</option>
                <option className={s.TextField} value="Zambia">Zambia</option>
                <option className={s.TextField} value="Zimbabwe">Zimbabwe</option>
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
      </div>}
    </div>
  );
}

export default CharityAccount;
