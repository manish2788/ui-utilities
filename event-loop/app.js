function print(message) {
  document.body.insertAdjacentHTML('beforeend',`<p>${message}</p>`);
}
function foo() {
  print("Foo Called!!");
}

function bar() {
  print("Bar Called!!");
  foo();
}

function baz() {
  print("Baz Called!!");
  bar();
}

baz();