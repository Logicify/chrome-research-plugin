var tempArr = new Array();
var projectsArr = new Array();

function addRow(typeoflink, project, date, icon, url, title) {
    var table = document.getElementById('historyTable');
    var row = table.insertRow(1);
    var cell4 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    if (icon === undefined) {
        try {
            var icon_url = get_domainname(url) + 'favicon.ico';
        }
        catch (err) {
            console.log(err.message);
            var icon_url = "../img/16.png";
        }
    } else if (icon.substring(0, 1) !== '/') {
        var icon_url = icon;
    } else {
        var icon_url = /*url.substring(0, url.length)*/get_domainname(url) + icon;
    }
    cell4.innerHTML = typeoflink;
    if (project)
        cell1.innerHTML = project;
    else
        cell1.innerHTML = 'No project';
    cell2.innerHTML = date;
    cell3.innerHTML = '<a href="' + url + '">' + '<img src="' + icon_url + '" height="16">  ' + '</a>' + '<span>' + title + '</span>';
}


function selectProjects() {
    tempArr = JSON.parse(localStorage.localHistory);
    for (var i = 0; i < tempArr.length; i++)
        projectsArr[i] = tempArr[i].project;
    projectsArr.sort();
    for (var i = 0; i < projectsArr.length; i++)
        for (var j = i + 1; j < projectsArr.length;)
            if (projectsArr[i] == projectsArr[j]) projectsArr.splice(j, 1);
            else j++;
    //alert(projectsArr);
};

function addOption(selectbox, text, value) {
    var optn = document.createElement("option");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
}

window.onload = function () {

    selectProjects();
    for (var i = 0; i < projectsArr.length; ++i) {
        addOption(document.dropDown.selectProject, projectsArr[i], projectsArr[i]);
    }

    var localHistory = [];
    var temp = localStorage.getItem('localHistory');
    localHistory = JSON.parse(temp);

    for (var i = 0; i < temp.length; i++) {
        var historyObject = localHistory[i];
        addRow(historyObject.typeoflink, historyObject.project, historyObject.date, historyObject.icon, historyObject.url, historyObject.title);
    }
};

function get_domainname(url) {
    var pos = 0;

    for (var i = 0; i < 3 && url.length; i++) {
        var foundPos = url.indexOf('/', pos);
        if (foundPos == -1) break;

        pos = foundPos + 1; // продолжить поиск со следующей
    }
    return url.substring(0, pos);
}


function checkProject() {
    var localHistory = [];
    var tmp2 = localStorage.getItem('localHistory');
    localHistory = JSON.parse(tmp2);
    localHistory = localHistory.filter(function (value) {
        if (document.dropDown.selectProject.value == "All projects") return true;
        else if (value.project == document.dropDown.selectProject.value) return true;
        else return false;
    });

    var tableObject = document.getElementById('historyTable');
    while (document.getElementById('historyTable').getElementsByTagName('tr').length > 1)
        tableObject.deleteRow(1);

    for (var i = 0; i < localHistory.length; i++) {
        var tmp3 = localHistory[i];
        addRow(tmp3.typeoflink, tmp3.project, tmp3.date, tmp3.icon, tmp3.url, tmp3.title);
    }
}
// window.setInterval(checkProject,100);
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sp").addEventListener("change", checkProject);
});


window.addEventListener("keyup", function doSearch() {
    var searchText = document.getElementById('appendedInputButton').value;
    var targetTable = document.getElementById('historyTable');
    var targetTableColCount;
    var patt = new RegExp("(" + searchText + ")", "gi");

    //Loop through table rows
    for (var rowIndex = 0; rowIndex < targetTable.rows.length; rowIndex++) {
        var rowData = '';

        //Get column count from header row
        if (rowIndex == 0) {
            targetTableColCount = targetTable.rows.item(rowIndex).cells.length;
            continue; //do not execute further code for header row.
        }

        //Process data rows. (rowIndex >= 1)
        for (var colIndex = 2; colIndex < targetTable.rows.item(rowIndex).cells.length ; colIndex++) {
            var cellData = targetTable.rows.item(rowIndex).cells.item(colIndex).textContent;
            //If search term is not found in row data
            //then hide the row, else show
            if (!searchText) {
                targetTable.rows.item(rowIndex).style.display = 'table-row';
            } else if (!patt.test(cellData)) {
                targetTable.rows.item(rowIndex).style.display = 'none';
            } else {
                targetTable.rows.item(rowIndex).style.display = 'table-row';
                cellData = cellData.replace(patt, "<b>$1</b>");
                var node=document.createTextNode(cellData);
                targetTable.rows.item(rowIndex).cells.item(colIndex).getElementsByTagName("span")[0].appendChild(node);
            }
        }



    }
});