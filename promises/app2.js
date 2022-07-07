const setMessage = message => {
  let h2 = document.createElement('h2');
  h2.innerText = message;
  document.body.append(h2);
}

let promiseObj = new Promise((resolve, reject) => {
  let randomNumber = new Date().getUTCMilliseconds();
  if(randomNumber % 2 === 0)
    resolve(randomNumber);
  else
    reject(randomNumber + "- Reject");
})

promiseObj.then((result) => {
  setMessage(`Success : ${result}`);
}).catch(err => {
  setMessage(`Failure : ${err}`);
})

const fetchResource = async () => {
  let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
  let rawResult = await fetch(url);
  let result = await rawResult.json();
  console.log(result);
}

fetchResource();
