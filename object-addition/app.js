class A {
  constructor(value) {
    this.value = value + "-A";
  }
  valueOf() {
    return 7;
  }
}

class B {
  constructor(value) {
    this.value = value + "-B";;
  }
  valueOf() {
    return 9;
  }
}

let obj1 = new A("Obj1");
let obj2 = new B("Obj2");

console.log(obj1+obj2);
