const ajax = (userInfo, route, response) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.setRequestHeader("account", JSON.stringify(userInfo));
    if(response) {
        xhttp.onload = () => {
            if(xhttp.status === 200) {
                console.log(xhttp.responseText)
                //let data = JSON.parse(xhttp.responseText);
                //console.log(data);
            }
        };
    }
    xhttp.send();
}
export default ajax;