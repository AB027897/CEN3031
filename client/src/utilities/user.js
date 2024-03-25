class User {
    constructor(email, password, confirmPassword = "") {
       this.email = email;
       this.password = password;
       this.confirmPassword = confirmPassword;
    }
    validatePasswords = () => {
        if(this.password === this.confirmPassword) {
            return true;
        }
        return false;
    }
};

export default User;