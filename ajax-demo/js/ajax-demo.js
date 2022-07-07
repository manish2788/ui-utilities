const requestObject = new XMLHttpRequest();
const requestUrl = 'https://uishots.in/demo-api/response.php'

requestObject.open('GET', requestUrl);
requestObject.send();

requestObject.onreadystatechange = (event) => {
  console.log(requestObject.responseText);
}
