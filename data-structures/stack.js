function Stack() {
  this.count = 0;
  this.container = {};
}

Stack.prototype.size = function() {
  return this.count;
}

Stack.prototype.push = function(item) {
  this.container[this.count] = item;
  this.count++;
  return this.size();
}

Stack.prototype.pop = function() {
  if(this.size() === 0) {
    return undefined;
  }
  var result = this.container[this.count - 1];
  this.count--;
  delete this.container[this.count]
  return result;
}

Stack.prototype.peek = function() {
  return this.container[this.count - 1];
}

Stack.prototype.isEmpty = function() {
  return this.count === 0 ? true : false;
}

Stack.prototype.display = function() {
  var result = [];
  var self = this;
  Object.keys(this.container).forEach(function(value, index) {
    result.push(self.container[value]);
  })
  return result;
}

let stackObj = new Stack();
console.log(stackObj.push(7));
console.log(stackObj.push(3));
console.log(stackObj.display());
// console.log(stackObj.size());
// console.log(stackObj.peek());
// console.log(stackObj.isEmpty());
// console.log(stackObj.pop());
// console.log(stackObj.pop());
// console.log(stackObj.isEmpty());
// console.log(stackObj.size());
// console.log(stackObj.pop());
// console.log(stackObj.size());

let stackObj2 = new Stack();
console.log(stackObj2.push(9));
console.log(stackObj2.push(4));
console.log(stackObj2.display());
// console.log(stackObj.size());
// console.log(stackObj.peek());
// console.log(stackObj.isEmpty());
// console.log(stackObj.pop());
// console.log(stackObj.pop());
// console.log(stackObj.isEmpty());
// console.log(stackObj.size());
// console.log(stackObj.pop());
// console.log(stackObj.size());