let filteredData = {};
let listContainer = document.getElementById('dataList');

const renderData = (filteredData) => {
  Object.keys(filteredData).forEach(item => {
    let listEl = document.createElement('li'); 
    listEl.innerHTML =  `${item}  - <b>Total Amount</b> : ${filteredData[item].totalAmount}`;
    listContainer.appendChild(listEl);
  })
}

const fetchData = (url) => {
  fetch(url).then(response => {
    return response.json();
  }).then(result => {
    result.forEach(item => {
      let merchantName = item["merchant"].replace(/ /g,"_");
      let amount = typeof item.amount === 'string' ? Number(item.amount.replaceAll(",","")) : item.amount;

      if(!filteredData[merchantName]) {
        filteredData[merchantName] = {};
        filteredData[merchantName]["amountList"] = [];
        filteredData[merchantName]["totalAmount"] = 0;
      }
      filteredData[merchantName].amountList.push(amount);
      filteredData[merchantName].totalAmount += amount;
    });
    console.log(filteredData);
    renderData(filteredData);
  })
}



fetchData("data.json");