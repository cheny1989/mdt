let state = [];

// Save data in localStorage
function saveState() {
    var str = JSON.stringify(state);
    localStorage.setItem("state", str);
}

// Get date from localStorage
function getState() {
    var str = localStorage.getItem("state");
    state = JSON.parse(str);
    if (!state) {
        state = [];
    }
}
getState();

function addRow() {
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let fullName = document.getElementById("fullName").value;
    let takeDiamond = document.getElementById("takeDiamond").value;
    let pushDiamond = document.getElementById("pushDiamond").value;
    let typeOfDiamond = document.getElementById("typeOfDiamond").value;
    state.push({
        date: date,
        time: time,
        fullName: fullName,
        takeDiamond: takeDiamond,
        pushDiamond: pushDiamond,
        typeOfDiamond: typeOfDiamond
    })
    createAllRows()
    resetInputs();
}
createAllRows()

function createAllRows() {
    let container = document.getElementById("container");
    container.innerHTML = "";

    for (let i = 0; i < state.length; i++) {
        let item = state[i];

        if (item) {
            container.appendChild(createRowRegister(
                i,
                item.date,
                item.time,
                item.fullName,
                item.takeDiamond,
                item.pushDiamond,
                item.typeOfDiamond
            ));
            container.className = "row_style"
            saveState();
        }
    }
}

function createRowRegister(rowData, date, time, fullName, takeDiamond, pushDiamond, typeOfDiamond) {
    let row = document.createElement("div");
    row.innerHTML = `<div class="createRowRegisterStyle">
                    <table>
                    <tr>
                     <th> ${date.split("-").reverse().join("/")}</th>                   
                     <th> ${time}</th>                   
                     <th>${fullName}</th>                   
                     <th>${takeDiamond}</th>                   
                     <th>${pushDiamond}</th>                   
                     <th>${typeOfDiamond}</th>
                     </tr>
                     </table>
                     </div>`
    row.appendChild(createDeleteRow(rowData));
    return row;
}

function createDeleteRow(rowData) {
    let deleteButton = document.createElement("button");
    deleteButton.id = rowData;
    deleteButton.innerHTML = "X";
    deleteButton.className = "deleteButtonOfRow"
    deleteButton.onclick = deleteRow;
    return deleteButton;
}

function deleteRow(e) {

    if (window.confirm("האם אתה בטוח?")) {
        let promptWindow = prompt("אנא הכנס סיסמא כדי לאשר מחיקה זו")
        if (promptWindow === "1989"){
            let rowData = e.target.id;
            state[rowData] = null;
            createAllRows();
            saveState();
        } else{
            alert("סיסמא לא נכונה. אנא נסה שוב")
        }
    }
}

function resetInputs() {
    $('#date').val('')
    $('#time').val('')
    $('#fullName').val('')
    $('#takeDiamond').val('')
    $('#pushDiamond').val('')
    $('#typeOfDiamond').val('')
}

// currently date
let text = document.getElementById("dateToday");
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); 
let yyyy = today.getFullYear();

if(dd<9 && mm<9){
    text.innerHTML = "0"+(dd) + "/" +"0"+(mm) + "/" + yyyy
} else if (mm<9){
    text.innerHTML = (dd) + "/" + "0"+(mm) + "/" + yyyy
} else if (dd<9){
    text.innerHTML = "0"+(dd) + "/" + (mm) + "/" + yyyy
}else{
    text.innerHTML = dd + "/" + mm + "/" + yyyy
}