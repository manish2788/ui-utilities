const fn1 = () => {
  setTimeout(()=> {
    console.log("Function 1");
  }, 3*1000)
}

const fn2 = () => {
  setTimeout(()=> {
    console.log("Function 2");
  }, 2*1000)
}

fn1();
fn2();

let promise = new Promise((resolve, reject) => {
  resolve(fn1());
})

promise.then((result) => {
  console.log(`Result : ${result}`);
})