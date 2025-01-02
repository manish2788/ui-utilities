import communicator from "./communicator.js";

export default function dynamicTable () {
  const template = `
    <table id="dynamic-table">
      <thead></thead>
      <tbody></tbody>
    </table>
  `;
  let tableEl = null;
  const render = (rootEl) => {
    document.getElementById(rootEl).innerHTML = template;
    tableEl = document.getElementById("dynamic-table")
  };
  const updateTableView = (value) => {
    const tableBody = tableEl.querySelector("tbody");
    const rowCount = value[0];
    const colCount = value[1];
    const getColTemplate = (count) => {
      let tempString = "";
      for (let j = 0; j < count; j++) {
        tempString = tempString + `<td>Empty Cell</td>`;
      }
      return tempString;
    }
    let row = '';
    for(let i = 0; i < rowCount; i++) {
      let cols = getColTemplate(colCount);
      row = row + `<tr>${cols}</tr>`;
    }
    tableBody.innerHTML =  row;
  }
  render('dynamic-table-container');
  communicator.subscribe('create-table', updateTableView);
}