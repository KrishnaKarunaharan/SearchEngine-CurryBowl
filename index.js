
function inputParsing() {
    input = document.getElementById("keywords").value;
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

    document.getElementById("results_content").innerHTML = content;
    document.getElementById("results_div").style.display = "block";

	xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/submit", false);
	xhttp.onreadystatechange = function () {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
           	history();
        }
	};
    xhttp.send(string);

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
            document.getElementById("ID").textContent=userInfo;
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
            document.getElementById("ID").textContent=userInfo;
        }
	}
    xhttp.send(null);
    
}


