
function inputParsing() {
    input = (document.getElementById("lookupText").value).toLowerCase();
    localStorage.setItem("array", input);
    submit();
}

function submit() {

    var string = localStorage.getItem("array");
    arr = string.match(/\S+/g)

    var OutputList = {};

    for (var i = 0, j = arr.length; i < j; i++){
       arr[i] = arr[i].toLowerCase();
       OutputList[arr[i]] = (OutputList[arr[i]] || 0) + 1;
    }

    var content = "";
    for (var obj in OutputList) {
        content += "<tr><td>" + obj + "</td> <td>" + OutputList[obj] + "</td></tr><tr>";
    }

    //document.getElementById("results_content").innerHTML = content;
    //document.getElementById("results_div").style.display = "block";


	xhttp = new XMLHttpRequest();
    var startTime = Date.now();
    xhttp.open("POST", "/submit", false);
	xhttp.onreadystatechange = function () {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
           	//history();

            /* ADDED FOR LAB 3*/
            response = JSON.parse(xhttp.response);
            var content = "";
            var numberResults; 
            var elapsedTime = ((Date.now() - startTime) / 1000).toFixed(3);
            (response[0] == null) ? numberResults = 0 : numberResults = response.length;
            document.getElementById("numberResults").innerHTML = "<b>About " + numberResults + " results (" + elapsedTime + " seconds)</b>"; 

            if (numberResults > 5){
                document.getElementById("loadMore").style.visibility = "visible";
            }
            for (var obj in response) {
                if (obj == 5 ){
                    localStorage.setItem("loadMore", response.slice(5,response.length));
                    break;
                }    
                content += "<p class='links'><a class='linkpreview' href=" + response[obj]  + "> " + response[obj] + "</a></p>";
            }
            document.getElementById("crawlerResults").innerHTML = content;





        }
	};
    xhttp.send(string);

}

function LoadMore(){
    var response = localStorage.getItem("loadMore").split(",");
    var vis = "hidden";
    for (var obj in response) {
        if (obj == 5 ){
            localStorage.setItem("loadMore", response.slice(5,response.length));
            vis = "visible"
            break;
        }    
        content =  document.getElementById("crawlerResults").innerHTML;
        content += "<p><a href=" + response[obj]  + "> " + response[obj] + "</a></p>";
        document.getElementById("crawlerResults").innerHTML = content
    }
    document.getElementById("loadMore").style.visibility = vis;
}

function history() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/history", false);
	xhttp.onreadystatechange = function () {
    	if(xhttp.readyState === 4 && xhttp.status === 200) {
            if (xhttp.response == "") {
                return 0;
            }
    		response = JSON.parse(xhttp.response);
            var content = "";

            for (var obj in response) {
                content += "<tr><td>" + response[obj][0] + "</td> <td>" + response[obj][1] + "</td></tr>";
            }
            document.getElementById("history_content").innerHTML = content;
            document.getElementById("history_div").style.display = "block";
            recent();
  		}
	};
    xhttp.send(null);

}

function recent() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/recent", false);
	xhttp.onreadystatechange = function () {
    	if(xhttp.readyState === 4 && xhttp.status === 200) {
            if (xhttp.response == "") {
                return 0;
            }
    		response = JSON.parse(xhttp.response);
            var content = "";

            for (var obj in response) {
                content += "<tr><td>" + response[obj] + "</td></tr>";
            }
            document.getElementById("recent_content").innerHTML = content;
            document.getElementById("recent_div").style.display = "block";
  		}
	};
    xhttp.send(null);
}

function login() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/login", false);
	xhttp.onreadystatechange = function () {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
		    window.location = xhttp.response;
        }
	}
    xhttp.send(null);
}

function logout() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/logout", false);
	xhttp.onreadystatechange = function () {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            userInfo = (xhttp.response);
            window.location.replace("");
            document.getElementById("user").textContent=userInfo;
        }

	}
    xhttp.send(null);
}

function currentUser() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/current_user", false);
	xhttp.onreadystatechange = function () {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            userInfo = (xhttp.response);
            document.getElementById("user").textContent=userInfo;
            if (userInfo === ""){
                document.getElementById("login").setAttribute('onclick','login()');
                document.getElementById("login").innerText= "Login";
            }
            else {
                document.getElementById("login").setAttribute('onclick','logout()');
                document.getElementById("login").innerText= "Logout";
            }
        }
	}
    xhttp.send(null);
    
}

