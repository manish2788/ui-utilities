import communicator from "./communicator.js";

export default function createTable() {
  const template = `<form action="#">
    <div>
      <label for="rows">No. of Rows</label>
      <input type="number" id="rows"/>
    </div>
    <div>
      <label for="cols">No. of Cols</label>
      <input type="number" id="cols"/>
    </div>
    <div>
      <button id="submit" type="button">Create Table</button>
    </div>
  </form>`;

  const render = (rootEl) => {
    document.getElementById(rootEl).innerHTML = template;
  }
  const submit = () => {
    document.getElementById('submit').addEventListener('click', () => {
      const rowValue = document.getElementById('rows').value;
      const colValue = document.getElementById('cols').value;
      communicator.publish('create-table',[rowValue, colValue]);
    })
  }
  render('create-table');
  submit();
}