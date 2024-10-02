
let chemicals;

async function fetchJSONData() {
    try {
        const res = await fetch("./DataSet.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        chemicals = data.dataArray;
       
        renderTable(); 
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
}

async function sendJSONData() {
    try {
       
       
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
}

fetchJSONData();

// Function to render the table
async function renderTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    chemicals.forEach((chemical, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="checkBox"><i class="fas fa-check "></i></td>
            <td>${chemical.name}</td>
            <td>${chemical.Vendor}</td>
            <td><input type="text" id="dencityValue" value=${chemical.Density}></td>
            <td><input type="text" id="viscoValue" value=${chemical.Viscosity}></td>
            <td>${chemical.Packaging}</td>
            <td>${chemical.packSize}</td>
            <td>${chemical.Unit}</td>
            <td>${chemical.Quantity}</td>
            `;
            
        tableBody.appendChild(row);
    });

    let check=document.querySelectorAll(".checkBox");
    // console.log(check);
    check.forEach((e)=>{
    
    e.onclick=(clk)=>{clk.target.parentElement.classList.add("selected");
        console.log("clk");
    }
});

    

}

// Function to sort the table
function sortTable(sortBy) {
    chemicals.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return -1;
        } else if (a[sortBy] > b[sortBy]) {
            return 1;
        } else {
            return 0;
        }
    });
    renderTable();
}


// Function to add a new row
function addRow() {
   
    const newRow = {
        name: "New Chemical",
        formula: "",
        molecularWeight: 0,
    };
    chemicals.push(newRow);
    renderTable();
}

// Function to move a row up
function moveRowUp() {
    const selectedRow = document.querySelector(".selected");
    if (selectedRow) {
        const rowIndex = Array.prototype.indexOf.call(selectedRow.parentNode.children, selectedRow);
        if (rowIndex > 0) {
            const rowAbove = selectedRow.parentNode.children[rowIndex - 1];
            selectedRow.parentNode.insertBefore(selectedRow, rowAbove);
            chemicals.splice(rowIndex, 1);
            chemicals.splice(rowIndex - 1, 0, chemicals[rowIndex]);
        }
    }
}

// Function to move a row down
function moveRowDown() {
    const selectedRow = document.querySelector(".selected");
    if (selectedRow) {
        const rowIndex = Array.prototype.indexOf.call(selectedRow.parentNode.children, selectedRow);
        if (rowIndex < chemicals.length - 1) {
            const rowBelow = selectedRow.parentNode.children[rowIndex + 1];
            selectedRow.parentNode.insertBefore(rowBelow, selectedRow);
            chemicals.splice(rowIndex, 1);
            chemicals.splice(rowIndex + 1, 0, chemicals[rowIndex]);
        }
    }
}

// Function to delete a row
function deleteRow() {
    const selectedRow = document.querySelector(".selected");
    if (selectedRow) {
        const rowIndex = Array.prototype.indexOf.call(selectedRow.parentNode.children, selectedRow);
        chemicals.splice(rowIndex, 1);
        renderTable();
    }
}

// Function to refresh the data
async function refreshData() {
     await fetchJSONData();
    renderTable();
}


async function saveData() {
    await fetchJSONData();
    renderTable();
//     const fs = require('fs');

// // Read the JSON file
// let rawData = fs.readFileSync('DataSet.json');
// let jsonData = JSON.parse(rawData);

// // Update the data
// jsonData.dataArray = chemicals;

// // Write the updated data back to the file
// fs.writeFileSync('data.json', JSON.stringify(jsonData));
}




// Event listeners
document.getElementById("add-row").addEventListener("click", addRow);
document.getElementById("move-up").addEventListener("click", moveRowUp);
document.getElementById("move-down").addEventListener("click", moveRowDown);
document.getElementById("delete-row").addEventListener("click", deleteRow);
document.getElementById("refresh-data").addEventListener("click", refreshData);
document.getElementById("save-data").addEventListener("click", saveData);

document.querySelectorAll(".sort-button").forEach((button) => {
    button.addEventListener("click", () => {
        const sortBy = button.getAttribute("data-sort");
        sortTable(sortBy);
    });
});

