/*
* kNN algorithm implementation
* Akhil Pandey
*/

var node = function (foo) {
  for(let key in foo) {
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

  for(let i in this.nodes) {
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

    for(let x in this.nodes) {
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
    let areasRange = areas.max - areas.min,
        roomsRange = rooms.max - rooms.min

    for(let x in this.refugees) {
        let refugee = this.refugees[x],
            delArea = refugee.areas - this.areas
            delRoom = refugee.rooms - this.rooms

        delArea = (delArea/areasRange)
        delRoom = (delRoom/roomsRange)
    }
}

nodeList.prototype.sortByDist = function () {
    this.nodes.sort(function (a, b) {
        return a.distance - b.distance
    })
}

nodeList.prototype.guessType = function (mysteryvalue) {
    let types = {}

    for(let i in this.nodes.slice(0, mysteryvalue)) {
        if(!types[nodes.type]) {
            types[nodes.type] = 0
        }
        types[nodes.type] += 1
    }

    let guess = {type: false, count: 0}
    for(let type in types) {
        if(types[type] > guess[type]) {
            guess.type = type
            guess.count = types[type]
        }
    }

    this.guess = guess
    return types
}

var test = {first: "fargument", second: "sargument"}

node(test)
