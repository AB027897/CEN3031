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