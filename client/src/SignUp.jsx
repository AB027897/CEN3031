import React from 'react';
import { useState } from 'react';
import './SignUp.css'

class User {
    constructor() {
       this.email = "";
       this.password = "";
    }
}
const ajax = (userInfo) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/signupvalidation", true);
    xhttp.setRequestHeader("account", JSON.stringify(userInfo));
    xhttp.send();
}

function Signup() {
    let user = new User()
    const [getDonorStatus, setDonorStatus] = useState(false);
    const [getCharityStatus, setCharityStatus] = useState(false);
    const changeState = (type) => {
        if(type === "donor") {
            setDonorStatus(true);
            setCharityStatus(false);
        } else {
            setCharityStatus(true);
            setDonorStatus(false);
        }
    }
    return (
        <div className = "Page">
            <header className="Title-Header">
                <p className="Title">DonorGram</p>
            </header>
            <div className="Account-Type-Div">
                <input type = "radio" value="Donor" checked={getDonorStatus} className="Radio" onClick={()=> changeState("donor")}/>
                <p className="Type">Donor</p> 
                <input type = "radio" value="Charity" checked={getCharityStatus} className="Radio" onClick={()=> changeState("charity")}/>
                <p className="Type">Charity</p>
            </div>
            <div className="Inputs">
                <h2 className="Field">Username</h2>
                <input className="Text-Field" type="text" placeholder='Enter Text...'/> 
                <h2 className='Field'>Password</h2>
                <input className="Text-Field" type="password" placeholder='Enter Text...' onChange={(event) => user.password = event.target.value}/>
                <h2 className='Field'>Email</h2>
                <input className="Text-Field" type="text" placeholder='Enter Text...' onChange={(event)=> user.email = event.target.value }/>
                <h2 className='Field'>Phone Number</h2>
                <input className="Text-Field" type="text" placeholder='Enter Text...'/>
            </div>
            <p className="Error-Text">* Invalid Email Address or Password</p>
            <button className="Button" onClick={() => ajax(user)}>SIGN UP</button>
            <p className="Redirect-Text">Have an account? <a className="App-link" href="/login" rel="noopener noreferrer">LOGIN</a></p>
        </div>
    );
}




export default Signup;