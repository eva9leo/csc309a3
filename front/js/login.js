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
    /* logged_in = true;
    document.getElementById("navId").innerHTML += "<li id = 'usr'><button id='usrbtn' onclick='myFunction()'> </button></li>";
    document.getElementById("usrbtn").innerHTML = username+"<div class='popup'><button class='popuptext' id='myPopup' onclick='logout()'>Logout</button></div>";
    document.getElementById("myintake").innerHTML = "My Intake";
    document.getElementById("thirdView").innerHTML = "<div id = 'post-login-content'></div>"
	setUpRecordView(); */
	actualLogin(username);

    var elem = document.getElementById("messageBox");
    elem.innerHTML = "Message from Admin Team: "
    if(logged_in == true){
        elem.innerHTML = "Welcome!  " + username;
    }
    setInterval(change2, 10000);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://74.15.30.211:3000/api/messages", false ); // false for synchronous request
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
    popup.classList.toggle("show");
}
function logout() {
    logged_in = false;
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
	//validate User first
	actualLogin(username);
    /* logged_in = true;
    document.getElementById("usr").innerHTML = username;
    document.getElementById("myintake").innerHTML = "My Intake";
    document.getElementById("thirdView").innerHTML = "<div id = 'post-login-content'></div>"
    setUpRecordView(); */

    var elem = document.getElementById("messageBox");
    elem.innerHTML = "Message from Admin Team: "
    if(logged_in == true){
        elem.innerHTML = "Welcome!  " + username;
    }
    setInterval(change2, 10000);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://74.15.30.211:3000/api/messages", false ); // false synchronous request
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

function actualLogin (name) {
	logged_in = true;
    document.getElementById("navId").innerHTML += "<li id = 'usr'><button id='usrbtn' onclick='myFunction()'> </button></li>";
    document.getElementById("usrbtn").innerHTML = name+"<div class='popup'><button class='popuptext' id='myPopup' onclick='logout()'>Logout</button></div>";
    document.getElementById("myintake").innerHTML = "My Intake";
    document.getElementById("thirdView").innerHTML = "<div id = 'post-login-content'></div>"
	
	getLocalDate()
	console.log(currentDate.year + '/' + currentDate.month + '/' + currentDate.date);
	
	setUpRecordView();
}

function setUpRecordView() {
			$('#post-login-content').append(
				$('<div>', {
				id: 'total-calories-display'
			}));

			$('#total-calories-display').append(
				$('<h2>', {
				text: 'Energy: 0 kCal, Protein: 0 g, Fat: 0 g, Carbohydrate: 0 g'
			}));
			
			$('#post-login-content').append(
				$('<div>', {
				id: 'date-selection'
			}));
			
			 setUpDateSelection();

			$('#post-login-content').append(
				$('<div>', {
				class: 'view2_container',
				id: 'record-container'
			}));

			$('#record-container').append(
				$('<div>', {
				class: 'itembox search_result',
				id: 'record-list-div'
			}));

			$('#record-list-div').append(
				$('<ul>', {
				id: 'record-list'
			}));

			$('#record-container').append(
				$('<div>', {
				class: 'itembox food_info',
				id: 'record-info'
			}));

			$('#record-info').append(
				$('<h2>', {
				class: 'food_info_title',
				text: 'Nutritional value'
			}));

			$('#record-info').append(
				$('<ul>', {
				id: 'record-nutrition-ul'
			}));
}

function setUpDateSelection() {
	// Setup year selection
	$('#date-selection').append('<select id="year-select" onchange="updateDate()">'  + '</select>');
	
	for (var year = (currentDate.year - 5); year <= (currentDate.year + 5); year++) {
		
		if (year == currentDate.year) {
			$('#year-select').append(
				'<option value=' + year + ' selected>' + year + '</option>'
			);
		} else {
			$('#year-select').append(
				'<option value=' + year + '>' + year + '</option>'
			);
		}
		
	}
	
	// Setup months selection
	$('#date-selection').append('<select id="month-select" onchange="updateDate()">'  + '</select>');
	$('#date-selection').append('<select id="date-select">'  + '</select>');
	
	for (var month = 1; month <= 12; month++) {
		
		if (month == currentDate.month) {
			$('#month-select').append(
				'<option value=' + month + ' selected>' + month + '</option>'
			);
		} else {
			$('#month-select').append(
				'<option value=' + month + ' >' + month + '</option>'
			);
		}
		
	}
	
	// Setup dates selection
	updateDate();
	
	$('#date-selection').append('<button id="change-date">Change Date</button>')
}

function updateDate(){

	var month = Number(document.getElementById('month-select').value);
	var year = Number(document.getElementById('year-select').value);
	
	document.getElementById('date-select').options.length = 0;
	
	var longmonths = [1,3,5,7,8,10,12];
	
	var total_dates = 0;
	if (longmonths.indexOf(month) != -1) {
		total_dates = 31;
	}else if (month == 2){
        if ((year % 4) == 0) {
			total_dates = 29;
		} else {
			total_dates = 28;
		}
    } else {
		total_dates = 30;
	}
	
	for (var date = 1; date <= total_dates; date++) {
		
		if (date == currentDate.date) {
			$('#date-select').append('<option value=' + date + ' selected>' + date + '</option>');
		}else {
			$('#date-select').append('<option value=' + date + ' >' + date + '</option>');
		}
	}
}


