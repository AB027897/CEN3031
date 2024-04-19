import {jwtDecode} from 'jwt-decode';
import ajax from './ajax'

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUser = async (uuid="") => {
    let token = "";
    if(uuid === "") {
        token = getToken();
    } else {
        token = uuid;
    }
    return new Promise( (resolve, reject)=> {
        resolve(ajax(token, "/signintoken"));
    });
}

export const checkToken = () => {
    let token = jwtDecode(getToken());
    if(Date.now()/1000.0 > token.exp) {
        localStorage.clear();
        return false;
    }
    return true;
}
