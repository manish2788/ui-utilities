let MyPromise = function(action) {
  console.log("MyPromise constructor!!");
  this.state = "pending";
  function resolve(value) {
    console.log("Resolve 1 - " + value);
    this.state = "fulfilled";
  }
  function reject(value) {
    console.log("Reject 1 - " + value);
  }
  action(resolve.bind(this), reject.bind(this));
}

MyPromise.prototype.then = function() {
  if(this.state === "fulfilled") {
    console.log("then function");
  }
}

var promiseObject = new MyPromise((res, rej) => {
  console.log("Promise Initiated");
  res("OM!!");
  rej();
});

console.log(promiseObject);

promiseObject.then((result) => {
  console.log(result);
})
