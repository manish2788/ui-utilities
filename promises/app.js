const setMessage = message => {
  let h2 = document.createElement('h2');
  h2.innerText = message;
  document.body.append(h2);
}

const promise = new Promise((resolve, reject) => {
  setMessage("Promise Created");
  setTimeout(() => {
    resolve("Resolved...");
  }, 5000);
  setTimeout(() => {
    resolve("Error...");
  }, 10000)
});

console.log(promise);

var retPromise = promise.then(result => {
  console.log(promise);
  setMessage(result);
  return "Manish";
});

console.log(retPromise);

promise.finally(() => {
  console.log(promise);
  setMessage("Finally!!");
})

promise.catch(err => {
  console.log(promise);
  setMessage(err);
})