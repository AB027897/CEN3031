const ajax = async (userInfo, route, response) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.setRequestHeader("account", JSON.stringify(userInfo));
    xhttp.send();
    return new Promise((resolve, reject) => {
        if(response) {
            xhttp.onload = () => {
                if(xhttp.status === 200) {
                    if(xhttp.getResponseHeader("Content-Type") === "application/json") {
                        resolve(JSON.parse(xhttp.responseText));
                    } else {
                        resolve(xhttp.responseText);
                    }
                } 
            };
        } else {
            resolve(null);
        }
    });
    
}
export default ajax;