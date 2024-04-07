import axios from "axios";

const ajax = async(userInfo, route, method = "get", files = new FormData(), contentType = "text/plain") => {
    userInfo = JSON.stringify(userInfo); 
    const response = await axios({
        method: method,
        url : route, 
        data: files,
        headers: {
            "account" : userInfo,
            "Content-Type": contentType
        }
    });
    return response["data"];

}
export default ajax;