let tasks = {
  task1 : {
    'exec' : () => {
      setTimeout(() => {
        console.log("Task 1");
      }, 3000);
    }
  },
  task2 : {
    'exec' : () => {
      console.log("Task 2");
    }
  },
  task3 : {
    'exec' : () => {
      console.log("Task 3");
    }
  }
}


//let tasks = [task1, task2, task3];
let promises = [];

const executor = () => {
  //let promises = [];
  Object.keys(tasks).forEach(task => {
    let fn = tasks[task]['exec'];
    
    let promise = new Promise((resolve, reject) => {
      resolve(fn());
    });
    promises.push(promise);
  });
  
  console.log(promises);
  promises[0].then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });

  promises[1].then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });

  promises[2].then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
}

executor()