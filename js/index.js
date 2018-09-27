function inputParsing() {
    input = document.getElementById("input").value;
    localStorage.setItem("array", input);
}


function outputParsing() {

    document.write(
        "<table style='width:100%' align='right'><tr><th>Word</th><th>Count</th> </tr>");
    var string = localStorage.getItem("array");
    arr = string.split(" ");

    var OutputList = {};

    for (var i = 0, j = arr.length; i < j; i++){
       arr[i] = arr[i].toLowerCase();
       OutputList[arr[i]] = (OutputList[arr[i]] || 0) + 1;
    }

    for (var obj in OutputList) {
        document.write("<tr><td>" + obj + "</td> <td>" + OutputList[obj] + "</td></tr><tr>");
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/submit", true);
    xhttp.send(JSON.stringify(OutputList));

    localStorage.clear();
    document.write("</table>");
}


