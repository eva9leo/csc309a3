var logged_in = false;
var url_login = "http://74.15.30.211:3000/api/users/";
var url_regis = "http://74.15.30.211:3000/api/users/user?username=";
var url_post = "http://74.15.30.211:3000/api/users";
function loginFun() {
    renderFirstView();
    //validate User first
    var username = document.getElementById("uname").value;
    var password = document.getElementById('upass').value;

    var GetUserExist = url_regis+username;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", GetUserExist, false ); // false for synchronous request
    xmlHttp.send();
    data=xmlHttp.responseText;
    jsonResponse = JSON.parse(data);

    if (jsonResponse == null){
        alert("Username do not exist");
        renderThirdView();
        return;
    }


    var GetUser = url_login+username+"?password="+password;
    xmlHttp.open( "GET", GetUser, false ); // false for synchronous request
    xmlHttp.send();
    //alert(xmlHttp.status);
    //alert(xmlHttp.readyState);
    var data=xmlHttp.responseText;
    var jsonResponse = JSON.parse(data);

    if (jsonResponse == null){
        alert("Wrong Password");
        renderThirdView();
        return;
    }

    //validate User first
    logged_in = true;
    document.getElementById("navId").innerHTML += "<li id = 'usr'><button id='usrbtn' onclick='myFunction()'> </button></li>";
    document.getElementById("usrbtn").innerHTML = username+"<div class='popup'><button class='popuptext' id='myPopup' onclick='logout()'>Logout</button></div>";
    document.getElementById("myintake").innerHTML = "My Intake";
    document.getElementById("thirdView").innerHTML = "<div id = 'post-login-content'></div>"

    setUpRecordView();

    var elem = document.getElementById("messageBox");
    elem.innerHTML = "Message from Admin Team: "
    if(logged_in == true){
        elem.innerHTML = "Welcome!  " + username;
    }
    setInterval(change2, 10000);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://192.168.2.21:3000/api/messages", false ); // false for synchronous request
    xmlHttp.send();
    var data=xmlHttp.responseText;
    var Response = JSON.parse(data);
    var response = JSON.parse(xmlHttp.responseText);
    var i = 0;
    setInterval(change2, 1000);
    function change2(){
        elem.innerHTML = response[i].title + ":   " + response[i].contents;
        i++;
        if (i >= response.length) {
            i = 0;
        }
    }
}

function myFunction() {
    var popup = document.getElementById("myPopup");
    console.log("popup: " + popup);
    console.log("popup-cl: " + popup.classList);
    popup.classList.toggle("show");
}

function logout() {
    logged_in = false;
    document.getElementById("usrbtn").onclick = '';
    document.getElementById("usr").remove();
    document.getElementById("myintake").innerHTML = "login";
    document.getElementById("thirdView").innerHTML = "<div class='container' id='login-container'> <div class='imgcontainer'><img src='photos/avatar_empty.png' alt='Avatar' class='avatar'></div><label class='login-label'><b>Username</b></label><input class='login-input' placeholder='Enter Username' id='uname' required><label class='login-label'><b>Password</b></label><input class='login-input' type='password' placeholder='Enter Password' id='upass' required><button id='loginbtn' onclick='loginFun()'>Login</button><button id='register' onclick='regisFun()'>Register</button></div>"
    document.getElementById("messageBox").innerHTML = "";
    renderFirstView();
}

function regisFun(){
    renderFirstView();
    //validate User first
    var username = document.getElementById("uname").value;
    var password = document.getElementById('upass').value;
    var xmlHttp = new XMLHttpRequest();
    //alert(password);
    var GetUserExist = url_regis+username;
    xmlHttp.open( "GET", GetUserExist, false ); // false for synchronous request
    xmlHttp.send();
    var data=xmlHttp.responseText;
    var jsonResponse = JSON.parse(data);
    if (jsonResponse != null){
        alert("Username exist");
        renderThirdView();
        return;
    }
    if (jsonResponse == null){
        alert("Username do not exist yet, make new user");
        xmlHttp.open( "POST", url_post, true );
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        //alert(xmlHttp.status);
        var sendReq = '{"username":' + '"'+username+'"' +', "password" :' + '"'+ password + '"'+'}';
        //alert(sendReq);
        xmlHttp.send(sendReq);
        //alert(xmlHttp.status);
        alert("register successful!");
    }
    logged_in = true;
    //validate User first
    document.getElementById("usr").innerHTML = username;
    document.getElementById("myintake").innerHTML = "My Intake";
    logged_in = true;
    document.getElementById("thirdView").innerHTML = "<div id = 'post-login-content'></div>"
    setUpRecordView();

    var elem = document.getElementById("messageBox");
    elem.innerHTML = "Message from Admin Team: "
    if(logged_in == true){
        elem.innerHTML = "Welcome!  " + username;
    }
    setInterval(change2, 10000);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://192.168.2.21:3000/api/messages", false ); // false synchronous request
    xmlHttp.send();
    var response = JSON.parse(xmlHttp.responseText);
    var i = 0;
    setInterval(change2, 1000);
    function change2(){
        //alert(response.length);
        elem.innerHTML = response[i].title + ":   " + response[i].contents;
        i++;
        if (i >= response.length) {
            i = 0;
        }
    }
}
