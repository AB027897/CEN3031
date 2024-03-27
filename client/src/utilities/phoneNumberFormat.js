//Code based on https://codesandbox.io/p/sandbox/react-phone-number-auto-format-dashes-hyphen-zdg30?file=%2Fsrc%2Fcomponent%2FPhoneNumber.tsx%3A9%2C1
const phoneNumberFormat = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    if (phoneNumber.length < 4) {
        return phoneNumber;
    }else if (phoneNumber.length < 7){
        return phoneNumber.replace(/(\d{3})(\d+)/, "($1) $2");
    }
    return phoneNumber.replace(/(\d{3})(\d{3})(\d+)/, "($1) $2-$3"); 
};
export default phoneNumberFormat;