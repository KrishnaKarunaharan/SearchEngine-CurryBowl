
function inputParsing() {
    input = document.getElementById("input").value;
    localStorage.setItem("array", input);
}


function outputParsing() {
    document.write(
        "<h2>Query Results</h2><table style='width:100%' align='right'><tr><th>Word</th><th>Count</th> </tr>");
    var string = localStorage.getItem("array");
    arr = string.match(/\S+/g)

    var OutputList = {};

    for (var i = 0, j = arr.length; i < j; i++){
       arr[i] = arr[i].toLowerCase();
       OutputList[arr[i]] = (OutputList[arr[i]] || 0) + 1;
    }

    for (var obj in OutputList) {
        document.write("<tr><td>" + obj + "</td> <td>" + OutputList[obj] + "</td></tr><tr>");
    }
	document.write("</table>");

	xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/submit", false);
	xhttp.onreadystatechange = function () {
    	if(xhttp.readyState === 4 && xhttp.status === 200) {
    		response = JSON.parse(xhttp.response);
  		}
	};
    xhttp.send(JSON.stringify(OutputList));

	document.write(
        "<br><br><h2>Popular Keywords</h2><table style='width:100%' align='right'><tr><th>Word</th><th>Count</th> </tr>");
  	for (var obj in response) {
        document.write("<tr><td>" + obj + "</td> <td>" + response[obj] + "</td></tr><tr>");
    }
	document.write("</table>");

	


    localStorage.clear();
    
}


