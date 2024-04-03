import ajax from "./ajax";
import {getUser, getToken} from "./token";

class Account {
    constructor(uuid, token, accountType="", phone="", email="", name="", dob="", charityType="") {
       this.uuid = uuid;
       this.token = token;
       this.account_type = accountType;
       this.name = name;
       this.email = email;
       this.phone = phone;
       this.dob = dob;
       this.charity_type= charityType;
    }
};
export default Account;

export const getAccount = async () => {
    const user = await getUser();
    return new Promise((resolve, reject)=> {
      resolve(new Account(user['localId'], getToken()));
    });
};

export const getAccountInfo = async (account = "") => {
    if(account === "") {
      account = await getAccount();
    }
    return new Promise( (resolve, reject)=> {
      resolve(ajax(account, "/getaccountinfo"));
    });
};


