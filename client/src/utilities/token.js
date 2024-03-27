import {jwtDecode} from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const clearToken = () => {
    localStorage.clear();
}

export const checkToken = (token) => {
    token = jwtDecode(token);
    if(Date.now()/1000.0 > token.exp) {
        return false;
    }
    return true;
}
