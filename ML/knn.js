/*
* kNN algorithm implementation
* Akhil Pandey
*/

var node = function (foo) {
  for(var key in foo) {
    this[key] = foo[key]
    console.log(this[key])
  }
}

var nodeList = function (mysterypoint) {
  this.node = []
  this.mysterypoint = mysterypoint
}

var test = {first: "fargument", second: "sargument"}

node(test)
