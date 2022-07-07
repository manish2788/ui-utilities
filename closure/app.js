
let myFunc = () => {
  var i = "Hello";
  let j = "World";
  return () => {
    console.log(this.i);
    //console.log(i+" "+ j);
  }
}

console.dir(myFunc());