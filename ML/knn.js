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
  this.nodes = []
  this.mysterypoint = mysterypoint
}

nodeList.prototype.methodName = function () {
  this.areas = {min: 1000, max: 0}
  this.rooms = {min: 1000, max: 0}

  for(var i in this.nodes) {
    if(this.nodes[i].rooms < this.rooms.min) {
        this.rooms.min = this.nodes[i].rooms
    }
    if(this.nodes[i].rooms > this.rooms.max) {
       this.rooms.max = this.nodes[i].rooms
    }
    if(this.nodes[i].areas < this.areas.min) {
        this.areas.min = this.nodes[i].min
    }
    if(this.nodes[i].areas > this.areas.max) {
        this.areas.max = this.nodes[i].max
    }
  }
}

var test = {first: "fargument", second: "sargument"}

node(test)
