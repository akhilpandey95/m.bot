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

nodeList.prototype.calcRange = function () {
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

nodeList.prototype.detUnknown = function () {
    this.calcRange()

    for(var x in this.nodes) {
        if(!this.nodes[i].type) {
            this.nodes[x].refugees = []
            for(var y in this.nodes) {
                if(!this.nodes[i].type) {
                    this.nodes[x].refugees.push(new node(this.nodes[y]))
                }
            }
        this.nodes[x].measureDist(this.areas, this.rooms)
        this.nodes[x].sortByDist()
        this.nodes[x].guessType(this.mysterypoint)
        }
    }
}

nodeList.prototype.measureDist = function (areas, rooms) {
    var areasRange = areas.max - areas.min,
        roomsRange = rooms.max - rooms.min

    for(var x in this.refugees) {
        var refugee = this.refugees[x],
            delArea = refugee.areas - this.areas
            delRoom = refugee.rooms - this.rooms

        delArea = (delArea/areasRange)
        delRoom = (delRoom/roomsRange)
    }
}

var test = {first: "fargument", second: "sargument"}

node(test)
