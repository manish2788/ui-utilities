let obj = {};

let Vehicle = function(type) {
  this.type = type;
}

Vehicle.prototype.getColor = function() {
  console.log("Get Color")
}

let car = new Vehicle('Car');

console.dir(Object);
console.dir(obj);
console.dir(Vehicle);
console.dir(car);

let fname = new String("Manish");
console.dir(fname);