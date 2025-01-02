/**
 * Run the functions in the tasks collection in series,
 * each one running once the previous function has completed.
 * If any functions in the series pass an error to its callback,
 * no more functions are run and callback is immediately called 
 * with the value of the error. Otherwise, callback receives an 
 * array of results when tasks have completed.
 */

const fn1 = () => {
  console.log("Function 1 execution completed");
  return "FN1";
}
const fn2 = () => {
  console.log("Function 2 execution completed");
  return "FN2";
}
const fn3 = () => {
  throw new Error("Function 3 execution failed");
}
const fn4 = () => {
  console.log("Function 4 execution completed");
  return "FN4";
}
const tasksCollection = [fn1,fn2,fn3];

function callback(tasksCollection) {
  let result = [];
  let errorMessage;
  tasksCollection.forEach(task => {
    try {
      result.push(task()); 
    } catch (error) {
      errorMessage = error.message;
      return;
    }
  });
  return (errorMessage ? errorMessage : result);
}
const output = callback(tasksCollection);
console.log(`Output:${output}`);