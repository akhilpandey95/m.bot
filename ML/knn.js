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

node.prototype.measureDist = function (areas, rooms) {
    let areasRange = areas.max - areas.min,
        roomsRange = rooms.max - rooms.min

    for(let x in this.refugees) {
        let refugee = this.refugees[x],
            delArea = refugee.areas - this.areas,
            delRoom = refugee.rooms - this.rooms

        delArea = (delArea)/(areasRange)
        delRoom = (delRoom)/(roomsRange)

        refugee.distance = Math.sqrt(delArea*delArea + delRoom*delRoom)
    }
}

node.prototype.sortByDist = function () {
    this.refugees.sort(function (a, b) {
        return a.distance - b.distance
    })
}

node.prototype.guessType = function (mysteryvalue) {
    let types = {}

    for(let i in this.refugees.slice(0, mysteryvalue)) {
        let refugee = this.refugees[i]
        if(!types[refugee.type]) {
            types[refugee.type] = 0
        }
        types[refugee.type] += 1
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

var nodeList = function (mysterypoint) {
  this.nodes = []
  this.mysterypoint = mysterypoint
}

nodeList.prototype.add = function (node) {
    this.nodes.push(node)
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
        if(!this.nodes[x].type) {
            this.nodes[x].refugees = []
            for(let y in this.nodes) {
                if(!this.nodes[x].type) {
                    continue
                    this.nodes[x].refugees.push(new node(this.nodes[y]))
                }
            }
        this.nodes[x].measureDist(this.areas, this.rooms)
        this.nodes[x].sortByDist()
        this.nodes[x].guessType(this.mysterypoint)
        }
    }
}

nodeList.prototype.draw = function(canvas_id) {
    var rooms_range = this.rooms.max - this.rooms.min;
    var areas_range = this.areas.max - this.areas.min;

    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");
    var width = 400;
    var height = 400;
    ctx.clearRect(0,0,width, height);

    for (var i in this.nodes)
    {
        ctx.save();

        switch (this.nodes[i].type)
        {
            case 'apartment':
                ctx.fillStyle = 'red';
                break;
            case 'house':
                ctx.fillStyle = 'green';
                break;
            case 'flat':
                ctx.fillStyle = 'blue';
                break;
            default:
                ctx.fillStyle = '#666666';
        }

        var padding = 40;
        var x_shift_pct = (width  - padding) / width;
        var y_shift_pct = (height - padding) / height;

        var x = (this.nodes[i].rooms - this.rooms.min) * (width  / rooms_range) * x_shift_pct + (padding / 2);
        var y = (this.nodes[i].area  - this.areas.min) * (height / areas_range) * y_shift_pct + (padding / 2);
        y = Math.abs(y - height);


        ctx.translate(x, y);
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI*2, true);
        ctx.fill();
        ctx.closePath();


        /*
         * Is this an unknown node? If so, draw the radius of influence
         */

        if ( ! this.nodes[i].type )
        {
            switch (this.nodes[i].guess.type)
            {
                case 'apartment':
                    ctx.strokeStyle = 'red';
                    break;
                case 'house':
                    ctx.strokeStyle = 'green';
                    break;
                case 'flat':
                    ctx.strokeStyle = 'blue';
                    break;
                default:
                    ctx.strokeStyle = '#666666';
            }

            var radius = this.nodes[i].refugees[this.k - 1].distance * width;
            radius *= x_shift_pct;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI*2, true);
            ctx.stroke();
            ctx.closePath();

        }

        ctx.restore();

    }

};



var nodes;

var data = [
    {rooms: 1, area: 350, type: 'apartment'},
    {rooms: 2, area: 300, type: 'apartment'},
    {rooms: 3, area: 300, type: 'apartment'},
    {rooms: 4, area: 250, type: 'apartment'},
    {rooms: 4, area: 500, type: 'apartment'},
    {rooms: 4, area: 400, type: 'apartment'},
    {rooms: 5, area: 450, type: 'apartment'},

    {rooms: 7,  area: 850,  type: 'house'},
    {rooms: 7,  area: 900,  type: 'house'},
    {rooms: 7,  area: 1200, type: 'house'},
    {rooms: 8,  area: 1500, type: 'house'},
    {rooms: 9,  area: 1300, type: 'house'},
    {rooms: 8,  area: 1240, type: 'house'},
    {rooms: 10, area: 1700, type: 'house'},
    {rooms: 9,  area: 1000, type: 'house'},

    {rooms: 1, area: 800,  type: 'flat'},
    {rooms: 3, area: 900,  type: 'flat'},
    {rooms: 2, area: 700,  type: 'flat'},
    {rooms: 1, area: 900,  type: 'flat'},
    {rooms: 2, area: 1150, type: 'flat'},
    {rooms: 1, area: 1000, type: 'flat'},
    {rooms: 2, area: 1200, type: 'flat'},
    {rooms: 1, area: 1300, type: 'flat'},
];
var run = function() {

    nodes = new nodeList(3);
    for (var i in data)
    {
        nodes.add( new node(data[i]) );
    }
    var random_rooms = Math.round( Math.random() * 10 );
    var random_area = Math.round( Math.random() * 2000 );
    nodes.add( new node({rooms: random_rooms, area: random_area, type: false}) );

    nodes.detUnknown();
    nodes.draw("canvas");
};


setInterval(run, 5000);
run();

var test = {first: "fargument", second: "sargument"}

//node(test)
