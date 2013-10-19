var tempArr = new Array() ;
var projectsArr = new Array();

function addRow(local_info) {
    var table = document.getElementById('historyTable');
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell5 = row.insertCell(3);
    if (local_info.project)
        cell1.innerHTML = local_info.project;
    else
        cell1.innerHTML = 'No project';
    cell2.innerHTML = local_info.date;
    cell3.innerHTML = '<a href="' + local_info.url + '">' + ' <img src="' + local_info.icon + '" height="16"> ' + '</a>';
    if (local_info.copy_text) {
        cell5.innerHTML = local_info.copy_text;
        cell5.setAttribute('title', local_info.title);
    }
    else if (local_info.image) {
        cell5.innerHTML = '<a href="' + local_info.url + '">' + ' <img src="' + local_info.image + '" height="16"> ' + '</a>';
    }
    else {
        cell5.innerHTML = local_info.title;
    }

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
        addRow(historyObject);
    }
};

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
        addRow(tmp3);
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
        for (var colIndex = 3; colIndex < targetTable.rows.item(rowIndex).cells.length; colIndex++) {
            var cellData = targetTable.rows.item(rowIndex).cells.item(colIndex).textContent;
            //If search term is not found in row data
            //then hide the row, else show
            if (!searchText) {
                targetTable.rows.item(rowIndex).style.display = 'table-row';
                targetTable.rows.item(rowIndex).cells.item(colIndex).innerHTML = cellData;
            } else if (!patt.test(cellData)) {
                targetTable.rows.item(rowIndex).style.display = 'none';
            } else {
                targetTable.rows.item(rowIndex).style.display = 'table-row';
                cellData = cellData.replace(patt, "<span style='background-color:yellow;'>$1</span>");
                targetTable.rows.item(rowIndex).cells.item(colIndex).innerHTML = cellData;
            }
        }
    }
});